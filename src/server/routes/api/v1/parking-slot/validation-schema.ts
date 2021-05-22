// These schemas are implemented following:
// https://www.fastify.io/docs/latest/Validation-and-Serialization/#validation
export default {
  createParkingSlotSchema: {
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
  updateParkingSlotSchema: {
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
