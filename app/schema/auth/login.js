exports.loginSchema = {
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
        },
        additionalProperties: false,
        errorMessage: {
          required: {
            email: 'email is required',
            password: 'password is required',
          },
          additionalProperties: 'only email and password are allowed',
        },
      },
      query: {},
      params: {},
    },
  };
  