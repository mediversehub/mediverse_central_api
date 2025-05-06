const { EMAIL_REGEX, PHONE_REGEX } = require('../../src/constants/index');

export const schemas = [
  {
    collection: 'Mediverse_Users',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'first_name',
          'username',
          'email',
          'password',
          'permanent_address',
        ],
        properties: {
          first_name: { bsonType: 'string', minLength: 1 },
          last_name: { bsonType: ['string', 'null'] },
          username: {
            bsonType: 'string',
            minLength: 3,
            pattern: '^[a-z0-9_]+$',
          },
          email: {
            bsonType: 'string',
            pattern: EMAIL_REGEX.toString(),
          },
          password: { bsonType: 'string', minLength: 6 },
          contact: {
            bsonType: ['string', 'null'],
            pattern: PHONE_REGEX.toString(),
          },
          alternate_contact: {
            bsonType: ['string', 'null'],
            pattern: PHONE_REGEX.toString(),
          },
          emergency_contact: {
            bsonType: ['object', 'null'],
            properties: {
              name: { bsonType: 'string' },
              phone: {
                bsonType: 'string',
                pattern: PHONE_REGEX.toString(),
              },
              relation: { bsonType: 'string' },
            },
          },
          date_of_birth: { bsonType: ['date', 'null'] },
          gender: {
            bsonType: ['string', 'null'],
            enum: ['male', 'female', 'other'],
          },
          profile_picture: { bsonType: ['string', 'null'] },
          permanent_address: {
            bsonType: 'object',
            required: ['address'],
            properties: {
              address: { bsonType: 'string', minLength: 1 },
              pincode: {
                bsonType: ['string', 'null'],
                pattern: '^[1-9][0-9]{5}$',
              },
              state: { bsonType: ['string', 'null'] },
              city: { bsonType: ['string', 'null'] },
              location: {
                bsonType: ['object', 'null'],
                required: ['type', 'coordinates'],
                properties: {
                  type: { enum: ['Point'] },
                  coordinates: {
                    bsonType: 'array',
                    minItems: 2,
                    maxItems: 2,
                    items: [{ bsonType: 'double' }, { bsonType: 'double' }],
                  },
                },
              },
            },
          },
          temporary_address: {
            bsonType: ['object', 'null'],
            properties: {
              pincode: {
                bsonType: ['string', 'null'],
                pattern: '^[1-9][0-9]{5}$',
              },
              state: { bsonType: ['string', 'null'] },
              city: { bsonType: ['string', 'null'] },
              location: {
                bsonType: ['object', 'null'],
                properties: {
                  type: { enum: ['Point'] },
                  coordinates: {
                    bsonType: 'array',
                    minItems: 2,
                    maxItems: 2,
                    items: [{ bsonType: 'double' }, { bsonType: 'double' }],
                  },
                },
              },
            },
          },
          blood_group: {
            bsonType: ['string', 'null'],
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
          },
        },
      },
    },
  },
  {
    collection: 'PendingUserRegistrations',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['first_name', 'username', 'email', 'password', 'otp'],
        properties: {
          first_name: { bsonType: 'string', minLength: 1 },
          last_name: { bsonType: ['string', 'null'] },
          username: {
            bsonType: 'string',
            minLength: 3,
            pattern: '^[a-z0-9_]+$',
          },
          email: {
            bsonType: 'string',
            pattern: EMAIL_REGEX.toString(),
          },
          password: { bsonType: 'string', minLength: 6 },
          contact: {
            bsonType: ['string', 'null'],
            pattern: PHONE_REGEX.toString(),
          },
          otp: { bsonType: 'string', minLength: 6, maxLength: 6 },
          otp_requests: { bsonType: 'int', minimum: 1 },
          last_otp_request_at: { bsonType: 'date' },
          failed_attempts: { bsonType: 'int', minimum: 0 },
          last_failed_at: { bsonType: 'date' },
        },
      },
    },
  },
];
