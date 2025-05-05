import { z } from 'zod';
import { uniqueEmailSchema } from './unique_email_schema';
import { uniqueContactSchema } from './unique_contact_schema';
import { uniqueUsernameSchema } from './unique_username_schema';
import { passwordSchema } from './register_schema';

export const loginSchema = z
  .object({
    credential: z.union([
      uniqueUsernameSchema.shape.username,
      uniqueEmailSchema.shape.email,
      uniqueContactSchema.shape.contact,
    ]),
    password: passwordSchema.shape.password,
  })
  .strict();
