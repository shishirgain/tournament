const express = require('express');
const Router = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerAPIDesc = swaggerJsDoc({
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: "Documentation for tournament",
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
                description: "All about home"
            },
            {
                name: "Admin",
                description: "All about admin"
            },
            {
                name: "User",
                description: "All about user"
            },
            {
                name: "Post",
                description: "All about post"
            },
            {
                name: "Category",
                description: "All about category"
            },
            {
                name: "File",
                description: "All about file"
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