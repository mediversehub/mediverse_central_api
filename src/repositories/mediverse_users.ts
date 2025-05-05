import Mediverse_Users from '../models/mediverse_users';
import bcrypt from 'bcrypt';

export const findByEmail = async (email: string) => {
  if (!email) return null;
  return await Mediverse_Users.findOne({ email });
};

export const findByPhone = async (phone: string) => {
  if (!phone) return null;
  return await Mediverse_Users.findOne({ contact: phone });
};

export const findByUsername = async (username: string) => {
  if (!username) return null;
  return await Mediverse_Users.findOne({ username });
};

export const validatePassword = async (user: any, password: string) => {
  if (!user || !password) return false;
  return await bcrypt.compare(password, user.password);
};

export const getUserById = async (id: string) => {
  if (!id) {
    return null;
  }
  return await Mediverse_Users.findById(id);
};
