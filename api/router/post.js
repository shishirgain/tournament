const express = require('express');
const Router = express.Router();
const Post = require('../model/Post');

const { requiredAdmin } = require('../middleware').auth;

const { check, validationResult } = require('express-validator');

/**
 * @swagger
 * components:
 *    schemas:
 *      Post[res]:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          category:
 *            type: integer
 *          title:
 *            type: string
 *          content:
 *            type: string
 * 
 *      Post[req]:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          category:
 *            type: integer
 *          content:
 *            type: string
 */
const schema = [
    check('title').notEmpty().isLength({ min: 3 }).withMessage('Must be at least 3 chars long'),
    check('category').notEmpty().withMessage('Empty category not allowed'),
    check('content').notEmpty().withMessage('Empty description not allowed'),
]

/** 
 * @swagger
 * /post:
 *    get:
 *      tags:
 *        - "Post"
 *      summary: Get all posts as json response
 *      description: Get all posts json response
 *      responses: 
 *        200:
 *          description: OK
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Post[res]'
 */
Router.get('/', async (req, res, next) => {
    Post.findAll({ raw: true , attributes: ['id', 'title', 'category', 'content', 'createdAt', 'updatedAt'] }).then(posts => {
        res.json(posts);
    })
})

/** 
 * @swagger
 * /post:
 *    post:
 *      tags:
 *        - "Post"
 *      summary: Create new post
 *      requestBody:
 *        description: "This json data that need to create a new post"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Post[req]"
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Post[res]"
 *        401:
 *          $ref: "#/components/responses/Unauthorized"   
 *      security:
 *        - Admin(token): []
 */
Router.post('/', requiredAdmin, schema, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    try {
        const post = Post.build(req.body);
        await post.save();
        res.json({ done: true, post })
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /post/{id}:
 *    get:
 *      tags:
 *        - "Post"
 *      summary: Get specific post by post id
 *      description: Get specific post by post id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This id use for getting specific post"
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Admin[res]"
 */
Router.get('/:id', async (req, res, next) => {
    const post = await Post.findOne({ where: { id: req.params.id } }).then(post => post);
    try {
        if (!post) throw Error('Post not found.')
        res.json(post)
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /post/{id}:
 *    put:
 *      tags:
 *          - "Post"
 *      summary: Update specific post by id
 *      description: Update specific post by id
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "This id use for updating specific post"
 *        required: true
 *        type: integer
 *        format: int64
 *      requestBody:
 *        description: "This json data that need to update this post"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Post[req]"
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Post[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *        - Admin(token): []
 */
Router.put('/:id', requiredAdmin, schema, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    const isUpdated = await Post.update(req.body, { where: { id: req.params.id } }).then(post => post[0]);
    try {
        if (!isUpdated) throw Error('Update not successfully');
        res.json({
            message: 'Update successfully',
            done: true
        })
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /post/{id}:
 *    delete:
 *      tags:
 *        - "Post"
 *      summary: Delete specific post by id
 *      description: Delete specific post by id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This id use for deleting specific post"
 *          required: true
 *          type: integer
 *          format: int64
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Post[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *          - Admin(token): []
 */
Router.delete('/:id', requiredAdmin, async (req, res, next) => {
    const post = await Post.findOne({ where: { id: req.params.id } }).then(post => post);
    try {
        if (!post) throw Error('Post not found');
        await post.destroy();
        res.json({
            message: 'Delete successfully'
        })
    } catch (error) {
        next(new Error(error.message));
    }
})

module.exports = Router;