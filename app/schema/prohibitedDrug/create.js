exports.createSchema = {
    type: 'object',
    required: [
      'body',
    ],
    properties: {
      body: {
        type: 'object',
        required: [
          'name',
        ],
        properties: {
          name: {
            type: 'string',
            errorMessage: 'Invalid name',
          },
        },
        additionalProperties: false,
        errorMessage: {
          required: {
            name: 'name is required',
          },
          additionalProperties: 'only name is allowed',
        },
      },
      query: {},
      params: {},
    },
  };
  