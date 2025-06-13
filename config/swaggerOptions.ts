// config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Central DataSystem",
      version: "1.0.0",
      description: "APIs for the Central DataSystem",
      contact: {
        name: "Techagon",
        email: "ayomideajayi007@gmail.com",
        url: "https://techagon.org",
      },
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/",
        description: "Local Server",
      },
      {
        // url: "https://central-be-dev-775818477993.us-central1.run.app/",
        // description: "Development Server",
      },
      {
        // url: "https://central-be-dev-775818477993.us-central1.run.app/",
        // description: "QA -Testing Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "src/routes*.ts",
    "src/routes/*.ts",
    "src/routes/**/*.ts",
    "src/qa-user/*.ts",
    "src/qa-user/**/*.ts",
    "src/auth/routes/dashboard.route.ts",
    "src/swagger-docs/**/*.ts",
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
