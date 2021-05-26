export default {
  createVehicleSchema: {
    body: {
      type: 'object',
      required: ['license', 'color', 'model', 'brand'],
      properties: {
        license: {
          type: 'string',
        },
        color: {
          type: 'string',
        },
        model: {
          type: 'string',
        },
        brand: {
          type: 'string',
        },
      },
    },
  },
};
