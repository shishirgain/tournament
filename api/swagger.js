const express = require('express');
const Router = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerAPIDesc = swaggerJsDoc({
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: "Documentation for RestAPI",
            description: "Example of swagger UI",
            termsOfService: "http://example.com/terms/",
            contact: {
                name: "API Support",
                email: "shishir0019@gmail.com"
            },
            license: {
                name: "MIT",
                url: "https://www.apache.org/licenses/LICENSE-2.0.html"
            },
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:5000/api/v/1.0.0/",
                description: "Development server"
            }
        ],
        host: "http://localhost:5000",
        basePath: "/api/v/1.0.0",
        tags: [
            {
                name: "Home",
                description: "All about home",
                externalDocs: {
                    description: "Find out more",
                    url: "http://swagger.io"
                }
            },
            {
                name: "Admin",
                description: "All about admin",
                externalDocs: {
                    description: "Find out more",
                    url: "http://swagger.io"
                }
            },
            {
                name: "User",
                description: "All about user",
                externalDocs: {
                    description: "Find out more",
                    url: "http://swagger.io"
                }
            },
            {
                name: "Post",
                description: "All about post",
                externalDocs: {
                    description: "Find out more",
                    url: "http://swagger.io"
                }
            },
            {
                name: "Category",
                description: "All about category",
                externalDocs: {
                    description: "Find out more",
                    url: "http://swagger.io"
                }
            },
            {
                name: "File",
                description: "All about file",
                externalDocs: {
                    description: "Find out more",
                    url: "http://swagger.io"
                }
            },
            {
                name: "Rating",
                description: "All about Rating",
                externalDocs: {
                    description: "Find out more",
                    url: "http://swagger.io"
                }
            },
        ],
        schemes: [
            "https",
            "http",
        ]
    },
    apis: ["./api/swagger.js", './api/router/*.js']
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      Admin(token):
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      SuperAdmin(token):
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      User(token):
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *   responses:
 *      Unauthorized:
 *          description: Unauthorized
 *      Created:
 *          description: Created
 *      AlreadyExist:
 *          description: Already Exist
 */

Router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerAPIDesc));

module.exports = Router;