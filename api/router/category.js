const express = require('express');
const Router = express.Router();

const { requiredAdmin } = require('../middleware').auth;

const Category = require('../model/Category');

const { check, validationResult } = require('express-validator');

/**
 * @swagger
 * components:
 *    schemas:
 *      Category[res]:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          title:
 *            type: string
 *          slag:
 *            type: string
 *          root:
 *            type: integer
 * 
 *      Category[req]:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          slag:
 *            type: string
 *          root:
 *            type: integer
 */
const schema = [
    check('title').notEmpty().isLength({ min: 3, max: 15 }).withMessage('Must be at least 3 chars long'),
    check('slag'),
    check('root').notEmpty().withMessage('Empty root not allowed'),
]

/** 
 * @swagger
 * /category:
 *    get:
 *      tags:
 *        - "Category"
 *      summary: Get all category as json response
 *      description: Get all category as json response
 *      responses:
 *        200:
 *          description: OK
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category[res]'
 */
Router.get('/', (req, res, next) => {
    let getCategory = (id) => {
        return Category.findAll({ where: { root: id }, raw: true, attributes: ['id', 'title', 'slag', 'root'] })
            .then(categories => {
                return Promise.all(categories.map(async category => {
                    let children = await getCategory(category.id);
                    return children.length > 0 ? { ...category, children } : { ...category }
                }))
            })
    }
    getCategory(0).then(categories => {
        res.status(200).json(categories);
    })
})

/** 
 * @swagger
 * /category:
 *    post:
 *      tags:
 *        - "Category"
 *      summary: Create new category
 *      requestBody:
 *        description: "This json data that need to create a category"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Category[req]"
 *      responses:
 *        201:
 *          $ref: "#/components/responses/Created"   
 *        401:
 *          $ref: "#/components/responses/Unauthorized"   
 *        403:
 *          $ref: "#/components/responses/AlreadyExist"
 *      security:
 *        - Admin(token): []
 */
Router.post('/', requiredAdmin, schema, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    try {
        const isExist = await Category.findOne({ where: { slag: req.body.slag } }).then(category => category);
        if (isExist) {
            res.status(403);
            throw new Error('This category slag already used.')
        }
        const category = Category.build(req.body);
        await category.save();
        res.status(201).json({ done: true, category })
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /category/{id}:
 *    get:
 *      tags:
 *        - "Category"
 *      summary: Get specific category by id
 *      description: Get specific category by id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This id use for getting specific category"
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Category[res]"
 *        404:
 *          description: Not Found
 */
Router.get('/:id', async (req, res, next) => {
    const getChildren = (root) => {
        return Category.findAll({ where: { root }, raw: true, attributes: ['id', 'title', 'slag', 'root'] })
            .then(categories => {
                return Promise.all(categories.map(async category => {
                    let children = await getChildren(category.id);
                    return children.length > 0 ? { ...category, children } : { ...category }
                }))
            })
    }
    try {
        const category = await Category.findOne({ where: { id: req.params.id }, raw: true, attributes: ['id', 'title', 'slag', 'root'] })
            .then(async category => {
                if (!category) {
                    res.status(404);
                    throw new Error('Category not found.');
                } else {
                    let children = await getChildren(category.id);
                    return children.length > 0 ? { ...category, children } : { ...category }
                }
            })
        res.json(category);
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /category/{id}:
 *    put:
 *      tags:
 *          - "Category"
 *      summary: Update specific category by id
 *      description: Update specific category by id
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "This id use for updating specific category"
 *        required: true
 *        type: integer
 *        format: int64
 *      requestBody:
 *        description: "This json data that need to update this category"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Category[req]"
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Category[res]"
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
    try {
        const isExist = await Category.findOne({ where: { slag: req.body.slag }, raw: true, attributes: ['id'] }).then(category => category);
        if (isExist) {
            if (isExist.id != req.params.id) {
                res.status(403);
                throw new Error('This category slag already used')
            }
        }
        const isUpdated = await Category.update(req.body, { where: { id: req.params.id } }).then(category => category[0]);
        if (!isUpdated) throw Error('Update not successfully');
        res.json({
            done: true,
            message: 'Update successfully'
        })
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /category/{id}:
 *    delete:
 *      tags:
 *        - "Category"
 *      summary: Delete specific category by id
 *      description: Delete specific category by id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This id use for deleting specific category"
 *          required: true
 *          type: integer
 *          format: int64
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Category[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        404:
 *          description: Not found
 *      security:
 *          - Admin(token): []
 */
Router.delete('/:id', requiredAdmin, async (req, res, next) => {
    const category = await Category.findOne({ where: { id: req.params.id } }).then(category => category);
    const children = await Category.findAll({ where: { root: req.params.id } }).then(categories => categories);
    try {
        if (children.length) {
            res.status(400);
            throw new Error('Delete/move it\'s children category first');
        }
        if (!category) res.status(404).json({ message: 'Category not found' })
        else {
            await category.destroy();
            res.json({
                done: true,
                message: 'Delete successfully'
            })
        }
    } catch (error) {
        next(new Error(error.message));
    }
})

module.exports = Router;