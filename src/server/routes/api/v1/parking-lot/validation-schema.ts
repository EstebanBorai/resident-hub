// These schemas are implemented following:
// https://www.fastify.io/docs/latest/Validation-and-Serialization/#validation
export default {
  createParkingLotSchema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
        },
      },
    },
  },
  updateParkingLotSchema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
        },
      },
    },
  },
};
