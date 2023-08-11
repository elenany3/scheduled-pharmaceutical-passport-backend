exports.createSchema = {
  type: 'object',
  required: [
    'body',
  ],
  properties: {
    body: {
      type: 'object',
      required: [
        'patient_name',
        'passport_number',
        'countries',
        'instructions',
        'drugs',
      ],
      properties: {
        patient_name: {
          type: 'string',
          errorMessage: 'Invalid patient_name',
        },
        passport_number: {
          type: 'string',
          errorMessage: 'Invalid passport_number',
        },
        countries: {
          type: 'string',
          errorMessage: 'Invalid instructions',
        },
        instructions: {
          type: 'string',
          errorMessage: 'Invalid instructions',
        },
        drugs: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'dosage'],
            properties: {
              name: {
                type: 'string',
                errorMessage: 'Invalid name',
              },
              dosage: {
                type: 'string',
                errorMessage: 'Invalid dosage',
              }
            },
            additionalProperties: false,
            errorMessage: {
              required: {
                name: 'name is required',
                dosage: 'dosage is required',
              },
              additionalProperties: 'only name and dosage is allowed',
            },
          },
          errorMessage: 'Invalid drugs list',
        },
      },
      additionalProperties: false,
      errorMessage: {
        required: {
          patient_name: 'patient_name is required',
          passport_number: 'passport_number is required',
          countries: 'countries is required',
          instructions: 'instructions is required',
          drugs: 'drugs is required',
        },
        additionalProperties: 'only patient_name, passport_number, countries, instructions and drugs are allowed',
      },
    },
    query: {},
    params: {},
  },
};
