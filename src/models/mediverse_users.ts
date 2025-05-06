import mongoose from 'mongoose';
import { EMAIL_REGEX, PHONE_REGEX } from '../constants';

const pointSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: false,
      validate: {
        validator: function (value: number[] | undefined) {
          return (
            !value ||
            (Array.isArray(value) &&
              value.length === 2 &&
              typeof value[0] === 'number' &&
              typeof value[1] === 'number')
          );
        },
        message: 'Coordinates must be an array of [longitude, latitude]',
      },
    },
  },
  { _id: false }
);

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
      minlength: 6,
    },

    contact: {
      type: String,
      unique: true,
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
        trim: true,
      },
      pincode: String,
      state: String,
      city: String,
      location: {
        type: pointSchema,
        required: false,
      },
    },
    temporary_address: {
      pincode: String,
      state: String,
      city: String,
      location: {
        type: pointSchema,
        required: false,
      },
    },
    blood_group: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
  },
  { timestamps: true, collection: 'Mediverse_Users' }
);

export default mongoose.model('Mediverse_Users', mediverseUsersSchema);
