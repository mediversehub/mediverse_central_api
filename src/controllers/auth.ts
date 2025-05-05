import { Response } from 'express';
import { EMAIL_REGEX, PHONE_REGEX } from '../constants';
import {
  findByEmail,
  findByPhone,
  findByUsername,
  getUserById,
  validatePassword,
} from '../repositories/mediverse_users';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens';
import { RequestType } from '../types/express';

export class AuthController {
  public self = async (req: RequestType, res: Response): Promise<any> => {
    const id = req.user?.id;

    const user = await getUserById(id || '');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
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
}
