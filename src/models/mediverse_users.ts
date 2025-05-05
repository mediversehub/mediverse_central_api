import mongoose from 'mongoose';
import { EMAIL_REGEX, PHONE_REGEX } from '../constants';

const pointSchema = {
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    required: true,
    validate: {
      validator: function (value: number[]) {
        return value.length === 2;
      },
      message: 'Coordinates must be an array of [longitude, latitude]',
    },
  },
};

const mediverseUsersSchema = new mongoose.Schema(
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

    alternate_contact: {
      type: String,
      match: [PHONE_REGEX, 'Phone must be 10 digits'],
    },
    emergency_contact: {
      name: String,
      phone: {
        type: String,
        match: [PHONE_REGEX, 'Phone must be 10 digits'],
      },
      relation: String,
    },

    date_of_birth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    profile_picture: {
      type: String,
    },
    permanent_address: {
      address: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: String,
      state: String,
      city: String,
      location: pointSchema,
    },
    temporary_address: {
      pincode: String,
      state: String,
      city: String,
      location: pointSchema,
    },
    blood_group: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
  },
  { timestamps: true }
);

mediverseUsersSchema.index({ username: 1 }, { unique: true });
mediverseUsersSchema.index({ email: 1 }, { unique: true });
mediverseUsersSchema.index({ contact: 1 }, { unique: true });

export default mongoose.model('Mediverse_Users', mediverseUsersSchema);
