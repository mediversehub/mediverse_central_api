import {
  OTP_FAILED_ATTEMPTS_LIMIT,
  OTP_FAILED_ATTEMPTS_LOCKOUT_PERIOD,
  OTP_LOCKOUT_PERIOD,
  OTP_RATE_LIMIT,
} from '../constants';
import {
  createPendingUserRegistration,
  findPendingUserRegistrationByEmail,
} from '../repositories/pending_user_registrations';
import { createHashedPassword, generateOTP, validateOtp } from '../utils';
import AppError from '../utils/app_error';

export class AuthService {
  private checkFailedAttempts = async (previousOtpRequest: any) => {
    const failed_attempts = previousOtpRequest.failed_attempts;
    const last_failed_at = previousOtpRequest.last_failed_at.getTime();
    const failed_attempts_limit = OTP_FAILED_ATTEMPTS_LIMIT;
    const failed_attempts_lockout_period = OTP_FAILED_ATTEMPTS_LOCKOUT_PERIOD;
    if (failed_attempts >= failed_attempts_limit) {
      const timeDiff = Date.now() - last_failed_at;
      if (timeDiff < failed_attempts_lockout_period) {
        throw new AppError(
          `Too many failed attempts, try again in ${
            (failed_attempts_lockout_period - timeDiff) / 1000
          } seconds`,
          429
        );
      }
    }
  };

  private checkTooManyRequests = async (previousOtpRequest: any) => {
    const otp_requests_limit = OTP_RATE_LIMIT;
    const lastRequestTime = previousOtpRequest.last_otp_request_at.getTime();
    if (previousOtpRequest.otp_requests >= otp_requests_limit) {
      const timeDiff = Date.now() - lastRequestTime;
      if (timeDiff < OTP_LOCKOUT_PERIOD) {
        throw new AppError(
          `Too many requests, please try again in ${
            (OTP_LOCKOUT_PERIOD - timeDiff) / 1000
          } seconds`,
          429
        );
      }
    }
  };

  public sendOtp = async (
    first_name: string,
    last_name: string,
    email: string,
    contact: string,
    username: string,
    password: string
  ) => {
    const otp = await generateOTP();
    const hashedOtp = await createHashedPassword(otp);

    if (!hashedOtp) {
      throw new AppError('Failed to generate OTP', 500);
    }

    const previousOtpRequest = await findPendingUserRegistrationByEmail(email);
    if (previousOtpRequest) {
      await this.checkTooManyRequests(previousOtpRequest);
      await this.checkFailedAttempts(previousOtpRequest);
      previousOtpRequest.otp_requests++;
      previousOtpRequest.last_otp_request_at = new Date();
      previousOtpRequest.otp = hashedOtp;
      await previousOtpRequest.save();
    } else {
      await createPendingUserRegistration({
        username,
        email,
        contact,
        password,
        first_name,
        last_name,
        otp: hashedOtp,
      });
    }

    // TODO : send otp through BullMQ + MJML + NodeMailer
  };

  public verifyOtp = async (email: string, otp: string) => {
    const pendingRegistration = await findPendingUserRegistrationByEmail(email);
    if (!pendingRegistration) {
      throw new AppError('Invalid Email,Please Register Again', 400);
    }

    await this.checkFailedAttempts(pendingRegistration);

    const otpSent = pendingRegistration.otp;

    const isCorrectOtp = await validateOtp(otpSent, otp);
    if (!isCorrectOtp) {
      pendingRegistration.failed_attempts += 1;
      pendingRegistration.last_failed_at = new Date();
      await pendingRegistration.save();
      throw new AppError('Incorrect OTP', 400);
    }
  };
}
