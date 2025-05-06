import { Response } from 'express';
import { EMAIL_REGEX, PHONE_REGEX } from '../constants';
import {
  createUser,
  findByEmail,
  findByPhone,
  findByUsername,
  getUserById,
} from '../repositories/mediverse_users';
import { findPendingUserRegistrationByEmail } from '../repositories/pending_user_registrations';
import { AuthService } from '../services/auth';
import { RequestType } from '../types/express';
import {
  generateAccessToken,
  generateRefreshToken,
  validatePassword,
} from '../utils';
import logger from '../utils/logger';

export class AuthController {
  private authService = new AuthService();

  public self = async (req: RequestType, res: Response): Promise<any> => {
    const id = req.user?.id;

    const user = await getUserById(id || '');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  };

  public isUsernameUnique = async (
    req: RequestType,
    res: Response
  ): Promise<any> => {
    const { username } = req.body;
    const user = await findByUsername(username);
    return res.status(200).json(!user);
  };

  public isEmailUnique = async (
    req: RequestType,
    res: Response
  ): Promise<any> => {
    const { email } = req.body;
    const user = await findByEmail(email);
    return res.status(200).json(!user);
  };

  public isContactUnique = async (
    req: RequestType,
    res: Response
  ): Promise<any> => {
    const { contact } = req.body;
    const user = await findByPhone(contact);
    return res.status(200).json(!user);
  };

  public register = async (req: RequestType, res: Response): Promise<any> => {
    const { username, email, contact, password, first_name, last_name } =
      req.body;

    let user = await findByUsername(username);
    logger.info(user);
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    user = await findByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    user = await findByPhone(contact);
    if (user) {
      return res.status(400).json({ message: 'Contact already exists' });
    }

    await this.authService.sendOtp(
      first_name,
      last_name,
      email,
      contact,
      username,
      password
    );

    return res.status(200).json({ message: 'OTP sent successfully' });
  };

  public verifyOtp = async (req: RequestType, res: Response): Promise<any> => {
    const { otp, email } = req.body;

    await this.authService.verifyOtp(email, otp);

    const pendingRegistration = await findPendingUserRegistrationByEmail(email);

    if (!pendingRegistration) {
      return res.status(500).json({ message: 'Something went wrong' });
    }

    const newUser = await createUser({
      username: pendingRegistration.username,
      email: pendingRegistration.email,
      contact: pendingRegistration.contact,
      password: pendingRegistration.password,
      first_name: pendingRegistration.first_name,
      last_name: pendingRegistration.last_name,
    });

    if (!newUser) {
      return res
        .status(500)
        .json({ message: 'Something went wrong while creating user' });
    }

    const newAccessToken = generateAccessToken(newUser?.id);
    const newRefreshToken = generateRefreshToken(newUser?.id);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    await pendingRegistration.deleteOne();

    return res.status(201).json({ message: 'OTP verified successfully' });
  };

  public login = async (req: RequestType, res: Response): Promise<any> => {
    const { credential, password } = req.body;
    let user = null;

    if (EMAIL_REGEX.test(credential)) {
      user = await findByEmail(credential);
    } else if (PHONE_REGEX.test(credential)) {
      user = await findByPhone(credential);
    } else {
      user = await findByUsername(credential);
    }

    if (!user) {
      return res.status(404).json({ message: 'Invalid Credentials' });
    }

    let isPasswordValid = await validatePassword(user, password);
    if (!isPasswordValid) {
      return res.status(404).json({ message: 'Invalid Credentials' });
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({
      message: 'Login successful',
    });
  };

  public logout = async (req: RequestType, res: Response): Promise<any> => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Logout successful' });
  };
}
