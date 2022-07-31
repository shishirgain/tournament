const express = require('express');
const Router = express.Router();
const { requiredAdmin } = require('../middleware').auth;
const { storage } = require('../middleware').storage;

const { delFile } = require('../tools');

const File = require('../model/File');

const { check, validationResult } = require('express-validator');

/**
 * @swagger
 * components:
 *    schemas:
 *      File[res]:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          title:
 *            type: string
 *          type:
 *            type: string
 *          url:
 *            type: string
 *          isVisiable:
 *            type: boolean
 * 
 *      File[req]:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          type:
 *            type: string
 *          url:
 *            type: string
 *          isVisiable:
 *            type: boolean
 */
const schema = [
    check('title').notEmpty().isLength({ min: 3, max: 30 }).withMessage('Must be between 3-30 chars long'),
    check('type').notEmpty().withMessage('Empty type not allowed'),
    check('url').notEmpty().withMessage('Empty root not allowed'),
    check('isVisiable')
]

/** 
 * @swagger
 * /file:
 *    get:
 *      tags:
 *        - "File"
 *      summary: Get all File as json response
 *      description: Get all File as json response
 *      responses:
 *        200:
 *          description: OK
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/File[res]'
 */
Router.get('/', (req, res, next) => {
    try {
        File.findAll({ attributes: ['id', 'title', 'type', 'url'], raw: true }).then(files => {
            res.status(200).json(files);
        })
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /file:
 *    post:
 *      tags:
 *        - "File"
 *      summary: Create new file
 *      requestBody:
 *        description: "This json data that need to create a file"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/File[req]"
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
Router.post('/', requiredAdmin ,storage.single('file'), async (req, res, next) => {
    console.log( typeof req.file.size);
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file;

    req.body.title = originalname;
    req.body.type = mimetype;
    req.body.url = `http://localhost:5000/~file/upload/${filename}`;
    req.body.path = path;
    req.body.size = size;
    req.body.isVisiable = true;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    try {
        const isExist = await File.findOne({ where: { title: req.body.title } });
        if (isExist) {
            res.status(403);
            delFile(path);
            throw new Error('This title already used.');
        }
        const file = File.build(req.body);
        await file.save();
        res.status(201).json({ done: true, file })
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /file/{id}:
 *    get:
 *      tags:
 *        - "File"
 *      summary: Get specific file by id
 *      description: Get specific file by id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This id use for getting specific file"
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/File[res]"
 *        404:
 *          description: Not Found
 */
Router.get('/:id', async (req, res, next) => {
    try {
        const file = File.findOne({ where: { id: req.params.id }, raw: true, attributes: ['id', 'title', 'type', 'url', 'isVisiable'] });
        if (file) {
            res.status(200).json(file);
        }
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /file/{id}:
 *    put:
 *      tags:
 *          - "File"
 *      summary: Update specific file by id
 *      description: Update specific file by id
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "This id use for updating specific file"
 *        required: true
 *        type: integer
 *        format: int64
 *      requestBody:
 *        description: "This json data that need to update this file"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/File[req]"
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/File[res]"
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
        const isExist = await File.findOne({ where: { title: req.body.title }, raw: true, attributes: ['id','path'] });
        if (isExist) {
            if (isExist.id != req.params.id) {
                res.status(403);
                throw new Error('This title already used')
            }
        }
        const isUpdated = await File.update(req.body, { where: { id: req.params.id } }).then(file => file[0]);
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
 * /file/{id}:
 *    delete:
 *      tags:
 *        - "File"
 *      summary: Delete specific file by id
 *      description: Delete specific file by id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This id use for deleting specific file"
 *          required: true
 *          type: integer
 *          format: int64
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/File[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        404:
 *          description: Not found
 *      security:
 *          - Admin(token): []
 */
Router.delete('/:id', requiredAdmin, async (req, res, next) => {
    const file = await File.findOne({ where: { id: req.params.id }, attributes: ['id', 'path'] });
    try {
        if (!file) res.status(404).json({ message: 'File not found' })
        else {
            await file.destroy();
            delFile(file.path);
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