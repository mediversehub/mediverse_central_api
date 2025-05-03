import { Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { generateAccessToken, verifyAccessToken } from '../utils/tokens';
import { DecodedToken, RequestType } from '../types/express';

export const auth = async (
  req: RequestType,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (accessToken) {
      try {
        const decoded: DecodedToken = verifyAccessToken(accessToken);
        req.user = decoded;
        return next();
      } catch {
        // fall through to check refreshToken if there is some sort of error in decoding access token
      }
    }

    if (refreshToken) {
      try {
        const decoded: DecodedToken = verifyAccessToken(refreshToken);
        const newAccessToken = generateAccessToken(decoded.id);

        res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          sameSite: 'strict' as const,
          secure: process.env.NODE_ENV === 'production',
        });

        req.user = decoded;
        return next();
      } catch {
        // refresh token invalid too so i will just send 401 clearing both cookies
      }
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res
      .status(401)
      .json({ message: 'Unauthorized: Invalid or expired tokens' });
  } catch (error) {
    logger.error('Auth middleware error', error);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
