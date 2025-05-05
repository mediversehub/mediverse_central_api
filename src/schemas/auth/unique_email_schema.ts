import { z } from 'zod';
import { EMAIL_REGEX } from '../../constants';

export const uniqueEmailSchema = z.object({
  email: z
    .string()
    .min(3, 'Email must be at least 3 characters long.')
    .max(50, 'Email must not exceed 50 characters.')
    .nonempty('Email cannot be empty.')
    .refine((val) => {
      return EMAIL_REGEX.test(val);
    }),
});
