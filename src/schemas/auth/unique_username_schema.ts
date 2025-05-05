import { z } from 'zod';

export const uniqueUsernameSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required.' })
      .min(3, 'Username must be at least 3 characters long.')
      .max(20, 'Username must not exceed 20 characters.')
      .nonempty('Username cannot be empty.'),
  })
  .strict();
