const express = require('express');
const Router = express.Router();

const { requiredUser, requiredAdmin } = require('../middleware').auth;

const Rating = require('../model/Rating');

const { check, validationResult } = require('express-validator');
const { Sequelize, where } = require('sequelize');


/**
 * @swagger
 * components:
 *    schemas:
 *      Rating[res]:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          postId:
 *            type: integer
 *          rating:
 *            type: integer
 * 
 *      Rating[req]:
 *        type: object
 *        properties:
 *          postId:
 *            type: integer
 *          rating:
 *            type: integer
 */
const schema = [
    check('postId').notEmpty().withMessage('Post id must needed'),
    check('rating').notEmpty().withMessage('Rating must needed'),
]


/** 
 * @swagger
 * /rating:
 *    get:
 *      tags:
 *        - "Rating"
 *      summary: Rating json response
 *      description: Get all rating json response
 *      responses: 
 *        200:
 *          description: OK
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rateing[res]'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *        - Admin(token): []
 */
Router.get('/', requiredAdmin, (req, res, next) => {
    Rating.findAll().then(rating => {
        res.json(rating);
    })
})

/** 
 * @swagger
 * /rating/average/{id}:
 *    get:
 *      tags:
 *        - "Rating"
 *      summary: Get avarage rating by post id
 *      description: Get avarage rating by post id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This post id use for getting avarage post rating"
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Rating[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 */
Router.get('/average/:postID', (req, res, next) => {
    Rating.findAll({
        where: { postId: req.params.postID },
        attributes: [
            [Sequelize.fn('AVG', Sequelize.col('rating')), 'average']
        ],
        raw: true
    }).then(data => {
        res.json(data)
    })
})


/** 
 * @swagger
 * /rating/:
 *    post:
 *      tags:
 *        - "Rating"
 *      summary: Create new rating and if exist so update
 *      description: Create new rating and if exist so update.
 *      requestBody:
 *        description: "This json data that need to create/update rating"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Rating[req]"
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Rating[res]"
 *        401:
 *          $ref: "#/components/responses/Unauthorized"
 *      security:
 *        - User(token): []
 */
Router.post('/', schema, requiredUser, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    try {
        req.body.userId = req.user.id;
        const rating = await Rating.findOne({ where: { postId: req.body.postId, userId: req.user.id }, attributes: ['rating'] }).then(rating => rating ? true : false);
        if (rating) {
            const isUpdated = await Rating.update(req.body, { where: { postId: req.body.postId, userId: req.user.id } }).then(isUpdated => isUpdated[0]);
            if (isUpdated) {
                res.json({
                    message: 'Update successfully'
                })
            }
        } else {
            const ratingBuild = Rating.build(req.body);
            await ratingBuild.save();
            res.json(ratingBuild);
        }
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /rating/{id}:
 *    get:
 *      tags:
 *        - "Rating"
 *      summary: Get specific rating by id
 *      description: Get specific rating by id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This id use for getting specific Rating"
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Rating[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *        - User(token): []
 */
Router.get('/:postID', requiredUser, async (req, res, next) => {
    const rating = await Rating.findOne({ where: { postId: req.params.postID, userId: req.user.id }, attributes: ['rating'] }).then(rating => rating);
    try {
        if (!rating) throw Error('Rating not found.')
        res.json(rating)
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /rating/{id}:
 *    patch:
 *      tags:
 *          - "Rating"
 *      summary: Update specific rating by id
 *      description: Update specific rating by id
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "This id use for getting specific user"
 *        required: true
 *        type: integer
 *        format: int64
 *      requestBody:
 *        description: "This json data that need to update this Rating"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Rating[req]"
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Rating[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *        - Admin(token): []
 */
Router.patch('/:id', schema, requiredAdmin, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    const isUpdated = await Rating.update(req.body, { where: { id: req.params.id } }).then(isUpdated => isUpdated[0]);
    try {
        if (!isUpdated) throw Error('Update not successfully');
        res.json({
            message: 'Update successfully'
        })
    } catch (error) {
        next(new Error(error.message));
    }
})


/** 
 * @swagger
 * /rating/{id}:
 *    delete:
 *      tags:
 *        - "Rating"
 *      summary: Delete specific rating by id
 *      description: Delete specific rating by id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This id use for getting specific rating"
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Rating[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *          - Admin(token): []
 */
Router.delete('/:id', requiredAdmin, async (req, res, next) => {
    const rating = await Rating.findOne({ where: { id: req.params.id } }).then(rating => rating);
    try {
        if (!rating) throw Error('Rating not found');
        await rating.destroy();
        res.json({
            message: 'Delete successfully'
        })
    } catch (error) {
        next(new Error(error.message));
    }
})


module.exports = Router;