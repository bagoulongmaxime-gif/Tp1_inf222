const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Blogging - INF222 TAF1',
      version: '1.0.0',
      description: 'API RESTful pour un blog simple (articles)',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Serveur local' }],
  },
  apis: ['./src/index.js', './src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
