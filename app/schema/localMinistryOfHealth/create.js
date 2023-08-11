exports.createSchema = {
    type: 'object',
    required: [
      'body',
    ],
    properties: {
      body: {
        type: 'object',
        required: [
          'email',
          'password',
          'address',
          'country_name',
        ],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            errorMessage: 'Invalid email',
          },
          password: {
            type: 'string',
            minLength: 4,
            maxLength: 50,
            errorMessage: 'Invalid password',
          },
          address: {
            type: 'string',
            errorMessage: 'Invalid address',
          },
          country_name: {
            type: 'string',
            errorMessage: 'Invalid country_name',
          },
          country_code: {
            type: 'string',
            errorMessage: 'Invalid country_code',
          },
        },
        additionalProperties: false,
        errorMessage: {
          required: {
            email: 'email is required',
            password: 'password is required',
            address: 'address is required',
            country_name: 'country_name is required',
          },
          additionalProperties: 'only email, password, address, country_name and country_code are allowed',
        },
      },
      query: {},
      params: {},
    },
  };
  