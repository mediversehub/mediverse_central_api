import { z } from 'zod';
import { PHONE_REGEX, EMAIL_REGEX } from '../../constants/index';

export const loginSchema = z.object({
  credential: z.string().refine(
    (val) => {
      if (EMAIL_REGEX.test(val)) return true;
      if (PHONE_REGEX.test(val)) return true;
      if (val.length >= 3) return true;
      return false;
    },
    {
      message: 'Please provide a valid email, phone number, or username.',
    }
  ),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long.')
    .max(20, 'Password must not exceed 20 characters.')
    .nonempty('Password cannot be empty.'),
});
