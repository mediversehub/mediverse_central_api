import { z } from 'zod';
import { uniqueEmailSchema } from './unique_email_schema';
import { uniqueContactSchema } from './unique_contact_schema';
import { uniqueUsernameSchema } from './unique_username_schema';

export const loginSchema = z
  .object({
    credential: z.union([
      uniqueUsernameSchema.shape.username,
      uniqueEmailSchema.shape.email,
      uniqueContactSchema.shape.contact,
    ]),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(6, 'Password must be at least 6 characters long.')
      .max(20, 'Password must not exceed 50 characters.')
      .nonempty('Password cannot be empty.'),
  })
  .strict();
