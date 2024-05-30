const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:9000',
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  components: {
    securitySchemes:{
        bearerAuth: {
            type: 'http',
            scheme: 'bearer'
        }
    }
}
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app/api/v1/users/routes.js', './app/api/v1/auth/routes.js'];

// generate swagger-output.json
swaggerAutogen(outputFile, endpointsFiles, doc);
