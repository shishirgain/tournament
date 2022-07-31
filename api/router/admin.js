const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { requiredAdmin, requiredSuperAdmin } = require('../middleware').auth;

const Admin = require('../model/Admin');

const { check, validationResult } = require('express-validator');

/**
 * @swagger
 * components:
 *    schemas:
 *      Admin[res]:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          type:
 *            type: string
 *          name:
 *            type: string
 *          email:
 *            type: string
 * 
 *      Admin[req]:
 *        type: object
 *        properties:
 *          type:
 *            type: string
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 */

const schema = [
    check('type').notEmpty().withMessage('Must need type'),
    check('name').notEmpty().withMessage('Name must be at least 3 chars long'),
    check('email').notEmpty().withMessage('Email address required.').isEmail().withMessage('Invalid email.'),
    check('password').notEmpty().withMessage('Password required').isLength({ min: 6, max: 30 }).withMessage('Password must be at least 6 chars - 30 chars long.'),
]

/** 
 * @swagger
 * /admin:
 *    get:
 *      tags:
 *        - "Admin"
 *      summary: Admin json response
 *      description: Get admin json response
 *      responses: 
 *        200:
 *          description: OK
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Admin[res]'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *        - Admin(token): []
 */
Router.get('/', requiredAdmin, (req, res, next) => {
    res.json({ admin: req.admin });
});

/** 
 * @swagger
 * /admin:
 *    post:
 *      tags:
 *        - "Admin"
 *      summary: Create admin
 *      description: This can only be done by the logged in admin.
 *      requestBody:
 *        description: "This json data that need to create a admin account"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Admin[req]"
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Admin[res]"
 *        401:
 *          $ref: "#/components/responses/Unauthorized"
 *      security:
 *        - SuperAdmin(token): [] 
 */
Router.post('/', requiredSuperAdmin, schema, async (req, res, next) => {
    const typeList = ['super', 'admin'];
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            throw new Error(errors.array()[0].msg)
        }
        if (req.body.type === 'super') {
            let isSuperExist = await Admin.findOne({ where: { type: 'super' }, raw: true, attributes: ['id', 'type', 'name', 'email'] });
            if (isSuperExist) {
                res.status(403);
                throw new Error('One super admin allow to create');
            }
        }
        if (!typeList.includes(req.body.type)) {
            res.status(403);
            throw new Error('Type invalid');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10).then(async password => password);
        req.body.password = hashedPassword

        const { admin, created } = await Admin.findOrCreate({ where: { email: req.body.email }, defaults: req.body })
            .then(async ([admin, created]) => await { admin, created })
        if (!created) {
            res.status(403);
            throw Error('This email already registred.');
        } else {
            delete admin.dataValues.password
            res.status(200);
            res.json({ admin, message: 'Create successfully' })
        }
    } catch (error) {
        next(new Error(error.message));
    }
});

/** 
 * @swagger
 * /admin/{id}:
 *    get:
 *      tags:
 *        - "Admin"
 *      summary: Get specific user response by admin id
 *      description: Get specific user response by admin id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This id use for getting specific admin"
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
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *        - Admin(token): []
 */
Router.get('/:id', requiredAdmin, (req, res, next) => {
    Admin.findOne({ where: { id: req.params.id }, attributes: ['id', 'type', 'name', 'email'] }).then(admin => {
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' })
        }
        res.json(admin)
    })
})

/** 
 * @swagger
 * /admin/{id}:
 *    patch:
 *      tags:
 *          - "Admin"
 *      summary: Update specific user response by user id
 *      description: Update specific user response by user id
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "This id use for getting specific admin"
 *        required: true
 *        type: integer
 *        format: int64
 *      requestBody:
 *        description: "This json data that need to update this account"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Admin[req]"
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Admin[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *        - Admin(token): []
 */

Router.patch('/:id', requiredAdmin, schema, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }
    // const isUpdated = await Admin.update(req.body, { where: { id: req.params.id } }).then(admin => admin[0]);
    try {
        // if (!isUpdated) throw Error('Update not successfully');
        // res.status(200);
        res.json({ message: 'Update successfully' })
    } catch (error) {
        next(new Error(error.message));
    }
})

/** 
 * @swagger
 * /admin/{id}:
 *    delete:
 *      tags:
 *        - "Admin"
 *      summary: Delete specific user response by user id
 *      description: Delete specific user response by user id
 *      requestBody:
 *        description: "This json data that need to update this account"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  password:
 *                      type:
 *                          string
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This id use for getting specific admin"
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
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *          - Admin(token): []
 */
Router.delete('/:id', requiredAdmin, async (req, res, next) => {
    const admin = await Admin.findOne({ where: { id: req.params.id } }).then(admin => admin);
    try {
        if (!admin) {
            throw new Error('User not exist.');
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, admin.password).then(isMatch => isMatch);
        if (!isPasswordMatch) {
            throw new Error('Password incorrect.');
        }
        const isDel = await Admin.destroy({ where: { id: req.params.id } }).then(isDel => isDel);
        if (isDel) {
            res.json({ success: true, message: 'Deletion successfull.' })
        } else {
            throw new Error('Deletion failed');

        }
    } catch (error) {
        res.status(404);
        next(new Error(error.message));
    }
})

/**
 * @swagger
 * components:
 *   schemas:
 *     Login[Admin]:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string   
 */
const loginSchema = [
    check('email').isEmail().notEmpty().withMessage('Email required.'),
    check('password').notEmpty().withMessage('Password required').isLength({ min: 6, max: 30 }).withMessage('Password must be at least 6 chars - 30 chars long.'),
]

/** 
 * @swagger
 * /admin/login:
 *    post:
 *      tags:
 *      - "Admin"
 *      summary: Login to admin panel
 *      description: Login to admin panel
 *      consumes:
 *        - "application/json"
 *      requestBody:
 *        description: Login object that need to login
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Login[Admin]"        
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Error
 */
Router.post('/login', loginSchema, async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            throw new Error(errors.array()[0].msg)
        }
        const admin = await Admin.findOne({ where: { email: req.body.email } }).then(admin => admin);
        if (!admin) {
            throw new Error('This id not registered yet.')
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, admin.password).then(isMatch => isMatch);
        if (!isPasswordMatch) {
            throw new Error('Password incorrect.')
        }
        delete admin.dataValues.password;
        const token = await jwt.sign({ id: admin.id, name: admin.name, email: admin.email }, process.env.SECRET_ADMIN, { expiresIn: '1d' })
        if (!isPasswordMatch) {
            throw new Error('Token creation failed.')
        }
        res.json({ admin, token, message: 'login successful' });
    } catch (error) {
        res.status(404);
        next(new Error(error.message));
    }
})

module.exports = Router;