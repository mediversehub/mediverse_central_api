import Mediverse_Users from '../models/mediverse_users';

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

export const getUserById = async (id: string) => {
  if (!id) {
    return null;
  }
  return await Mediverse_Users.findById(id);
};

export const createUser = async (user: any) => {
  if (!user) {
    return null;
  }
  return await Mediverse_Users.create(user);
};
