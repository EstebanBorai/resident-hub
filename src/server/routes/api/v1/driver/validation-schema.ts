export default {
  createDriverSchema: {
    body: {
      type: 'object',
      required: ['firstName', 'lastName', 'isResident', 'NID'],
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        isResident: {
          type: 'boolean',
        },
        NID: {
          type: 'string',
        },
      },
    },
  },
};
