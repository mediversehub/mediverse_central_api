import { z } from 'zod';
import { uniqueContactSchema } from './unique_contact_schema';
import { uniqueEmailSchema } from './unique_email_schema';
import { uniqueUsernameSchema } from './unique_username_schema';

export const registerSchema = z.object({
  first_name: z.string().nonempty('First name cannot be empty.'),
  last_name: z.string().nonempty('Last name cannot be empty.'),
  email: uniqueEmailSchema.shape.email,
  username: uniqueUsernameSchema.shape.username,
  contact: uniqueContactSchema.shape.contact,
  password: z
    .string()
    .min(8, 'Password must be at least 6 characters long.')
    .max(50, 'Password must not exceed 50 characters.')
    .nonempty('Password cannot be empty.'),
});
