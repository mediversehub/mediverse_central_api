import { z } from 'zod';
import { uniqueEmailSchema } from './unique_email_schema';

export const verifyOtpSchema = z
  .object({
    otp: z
      .string({ required_error: 'OTP is required.' })
      .min(6, 'OTP must be at least 6 characters long.')
      .max(6, 'OTP must not exceed 6 characters.')
      .nonempty('OTP cannot be empty.'),
    email: uniqueEmailSchema.shape.email,
  })
  .strict();
