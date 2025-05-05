import { Response } from 'express';
import { EMAIL_REGEX, PHONE_REGEX } from '../constants';
import {
  createHashedPassword,
  createUser,
  findByEmail,
  findByPhone,
  findByUsername,
  getUserById,
  validatePassword,
} from '../repositories/mediverse_users';
import { RequestType } from '../types/express';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens';

export class AuthController {
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

    const hashedPassword = await createHashedPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({ message: 'Something went wrong' });
    }

    const newUser = await createUser({
      username,
      email,
      contact,
      password: hashedPassword,
      first_name,
      last_name,
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

    return res.status(201).json(newUser);
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
