import { z } from 'zod';
import { PHONE_REGEX } from '../../constants';

export const uniqueContactSchema = z
  .object({
    contact: z
      .string({ required_error: 'Contact is required.' })
      .min(10, 'Contact must be at least 10 characters long.')
      .max(10, 'Contact must not exceed 10 characters.')
      .nonempty('Contact cannot be empty.')
      .refine((val) => PHONE_REGEX.test(val), {
        message: 'Please provide a valid phone number.',
      }),
  })
  .strict();
