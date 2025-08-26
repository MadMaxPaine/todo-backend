const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Документація для Todo API",
    },
  },
  apis: ["./src/routes/*.js"], // шлях до твоїх роутерів
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;