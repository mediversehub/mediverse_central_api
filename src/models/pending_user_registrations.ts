import mongoose from 'mongoose';
import { EMAIL_REGEX, PHONE_REGEX } from '../constants';

const pendingUserRegistrationsSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [EMAIL_REGEX, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    contact: {
      type: String,
      match: [PHONE_REGEX, 'Phone must be 10 digits'],
    },
    otp: {
      type: String,
      required: true,
    },
    otp_requests: {
      type: Number,
      default: 1,
    },
    last_otp_request_at: {
      type: Date,
      default: Date.now(),
    },
    failed_attempts: {
      type: Number,
      default: 0,
    },
    last_failed_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

pendingUserRegistrationsSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 }
);

export default mongoose.model(
  'PendingUserRegistrations',
  pendingUserRegistrationsSchema
);
