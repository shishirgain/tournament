const express = require('express');
const Router = express.Router();

/** 
 * @swagger
 * /:
 *    get:
 *      tags:
 *          - "Home"
 *      description: "This is a get api call"
 *      summary: "Get all home data"
 *      responses: 
 *          200:
 *              description: Ok
 *          400: 
 *              description: Error
 */
Router.get('/', (req, res, next) => {
    res.json({
        message: 'Get all home data'
    })
})

module.exports = Router;