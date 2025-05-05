const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

export const generateOTP = (length = 6): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

export const createHashedPassword = async (password: string) => {
  if (!password) return null;
  return await bcrypt.hash(password, 10);
};

export const validatePassword = async (user: any, password: string) => {
  if (!user || !password) return false;
  return await bcrypt.compare(password, user.password);
};

export const validateOtp = async (otpSent: string, otp: string) => {
  if (!otpSent || !otp) return false;
  return await bcrypt.compare(otp, otpSent);
};
