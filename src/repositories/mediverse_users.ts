import Mediverse_Users from '../models/mediverse_users';
import bcrypt from 'bcrypt';

export const findByEmail = async (email: string) => {
  return await Mediverse_Users.findOne({ email });
};

export const findByPhone = async (phone: string) => {
  return await Mediverse_Users.findOne({ contact: phone });
};

export const findByUsername = async (username: string) => {
  return await Mediverse_Users.findOne({ username });
};

export const validatePassword = async (user: any, password: string) => {
  return await bcrypt.compare(password, user.password);
};
