// These schemas are implemented following:
// https://www.fastify.io/docs/latest/Validation-and-Serialization/#validation
export default {
  login: {
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' },
      },
      required: ['authorization'],
    },
  },
};
