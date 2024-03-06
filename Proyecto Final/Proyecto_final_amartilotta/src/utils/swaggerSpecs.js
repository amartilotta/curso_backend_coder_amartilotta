import swaggerJSDOC from "swagger-jsdoc"
import { __dirname } from "./utils.js"


const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "eCommerce",
        version: "1.0.0",
        description: "API eCommerce",
      },
    },
    apis: [`${__dirname}/docs/*.yaml`],
  };
  
  export const swaggerSetup = swaggerJSDOC(swaggerOptions);