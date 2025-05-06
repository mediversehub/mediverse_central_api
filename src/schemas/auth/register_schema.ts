import { z } from 'zod';
import { uniqueContactSchema } from './unique_contact_schema';
import { uniqueEmailSchema } from './unique_email_schema';
import { uniqueUsernameSchema } from './unique_username_schema';

export const passwordSchema = z.object({
  password: z
    .string({ required_error: 'Password is required.' })
    .min(6, 'Password must be at least 6 characters long.')
    .max(50, 'Password must not exceed 50 characters.')
    .nonempty('Password cannot be empty.'),
});

export const registerSchema = z
  .object({
    first_name: z
      .string({ required_error: 'First name is required.' })
      .nonempty('First name cannot be empty.'),
    last_name: z.string().nullable(),
    email: uniqueEmailSchema.shape.email,
    username: uniqueUsernameSchema.shape.username,
    contact: uniqueContactSchema.shape.contact,
    password: passwordSchema.shape.password,
  })
  .strict();
