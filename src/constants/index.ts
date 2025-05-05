export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[6-9]\d{9}$/;
export const OTP_RATE_LIMIT = 5;
export const OTP_LOCKOUT_PERIOD = 60 * 60 * 1000;
export const OTP_FAILED_ATTEMPTS_LIMIT = 5;
export const OTP_FAILED_ATTEMPTS_LOCKOUT_PERIOD = 60 * 60 * 1000;
