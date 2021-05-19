// These schemas are implemented following:
// https://www.fastify.io/docs/latest/Validation-and-Serialization/#validation
export default {
  createUserSchema: {
    body: {
      type: 'object',
      required: ['email', 'password', 'role'],
      properties: {
        email: {
          type: 'string',
          maxLength: 320,
        },
        password: {
          type: 'string',
        },
        role: {
          type: 'string',
          enum: ['manager', 'user'],
        },
      },
    },
  },
};
