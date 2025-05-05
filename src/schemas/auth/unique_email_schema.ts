import { z } from 'zod';
import { EMAIL_REGEX } from '../../constants';

export const uniqueEmailSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required.' })
      .min(3, 'Email must be at least 3 characters long.')
      .max(50, 'Email must not exceed 50 characters.')
      .nonempty('Email cannot be empty.')
      .refine((val) => EMAIL_REGEX.test(val), {
        message: 'Please provide a valid email.',
      }),
  })
  .strict();
