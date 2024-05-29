const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:9000',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app/api/v1/users/routes.js'];

// generate swagger-output.json
swaggerAutogen(outputFile, endpointsFiles, doc);
