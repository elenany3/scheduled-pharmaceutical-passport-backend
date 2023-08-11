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
          'name',
          'phone',
          'registration_number',
          'national_number',
          'clinic_address'
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
          name: {
            type: 'string',
            errorMessage: 'Invalid name',
          },
          phone: {
            type: 'string',
            errorMessage: 'Invalid phone',
          },
          registration_number: {
            type: 'string',
            errorMessage: 'Invalid registration_number',
          },
          national_number: {
            type: 'string',
            errorMessage: 'Invalid national_number',
          },
          clinic_address: {
            type: 'string',
            errorMessage: 'Invalid clinic_address',
          },
        },
        additionalProperties: false,
        errorMessage: {
          required: {
            email: 'email is required',
            password: 'password is required',
            address: 'address is required',
            name: 'name is required',
            phone: 'phone is required',
            registration_number: 'registration_number is required',
            national_number: 'national_number is required',
            clinic_address: 'clinic_address is required',
          },
          additionalProperties: 'only email, password, address, name, phone, registration_number, national_number and clinic_address are allowed',
        },
      },
      query: {},
      params: {},
    },
  };
  