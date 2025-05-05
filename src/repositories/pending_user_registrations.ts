import PendingUserRegistrations from '../models/pending_user_registrations';

export const createPendingUserRegistration = async (user: any) => {
  if (!user) {
    return null;
  }
  return await PendingUserRegistrations.create(user);
};

export const findPendingUserRegistrationByEmail = async (email: string) => {
  if (!email) return null;
  return await PendingUserRegistrations.findOne({ email });
};
