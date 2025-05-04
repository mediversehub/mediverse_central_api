export const schemas = [
  {
    collection: "Mediverse_Users",
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "first_name",
          "username",
          "email",
          "password",
          "permanent_address",
        ],
        properties: {
          first_name: { bsonType: "string", minLength: 1 },
          last_name: { bsonType: ["string", "null"] },
          username: {
            bsonType: "string",
            minLength: 3,
            pattern: "^[a-z0-9_]+$",
          },
          email: {
            bsonType: "string",
            pattern: "^\\S+@\\S+\\.\\S+$",
          },
          password: { bsonType: "string", minLength: 8 },
          contact: {
            bsonType: ["string", "null"],
            pattern: "^[0-9]{10}$",
          },
          alternate_contact: {
            bsonType: ["string", "null"],
            pattern: "^[0-9]{10}$",
          },
          emergency_contact: {
            bsonType: ["object", "null"],
            properties: {
              name: { bsonType: "string" },
              phone: {
                bsonType: "string",
                pattern: "^[0-9]{10}$",
              },
              relation: { bsonType: "string" },
            },
          },
          date_of_birth: { bsonType: ["date", "null"] },
          gender: {
            bsonType: ["string", "null"],
            enum: ["male", "female", "other"],
          },
          profile_picture: { bsonType: ["string", "null"] },
          permanent_address: {
            bsonType: "object",
            required: ["address"],
            properties: {
              address: { bsonType: "string", minLength: 1 },
              pincode: {
                bsonType: ["string", "null"],
                pattern: "^[1-9][0-9]{5}$",
              },
              state: { bsonType: ["string", "null"] },
              city: { bsonType: ["string", "null"] },
              location: {
                bsonType: ["object", "null"],
                required: ["type", "coordinates"],
                properties: {
                  type: { enum: ["Point"] },
                  coordinates: {
                    bsonType: "array",
                    minItems: 2,
                    maxItems: 2,
                    items: [{ bsonType: "double" }, { bsonType: "double" }],
                  },
                },
              },
            },
          },
          temporary_address: {
            bsonType: ["object", "null"],
            properties: {
              pincode: {
                bsonType: ["string", "null"],
                pattern: "^[1-9][0-9]{5}$",
              },
              state: { bsonType: ["string", "null"] },
              city: { bsonType: ["string", "null"] },
              location: {
                bsonType: ["object", "null"],
                properties: {
                  type: { enum: ["Point"] },
                  coordinates: {
                    bsonType: "array",
                    minItems: 2,
                    maxItems: 2,
                    items: [{ bsonType: "double" }, { bsonType: "double" }],
                  },
                },
              },
            },
          },
          blood_group: {
            bsonType: ["string", "null"],
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
          },
        },
      },
    },
  },
];
