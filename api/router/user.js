const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { requiredUser, requiredAdmin } = require('../middleware').auth;

const User = require('../model/User');

const { check, validationResult } = require('express-validator');

/**
 * @swagger
 * components:
 *    schemas:
 *      User[res]:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *          email:
 *            type: string
 * 
 *      User[req]:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 */
const schema = [
    check('name').notEmpty().withMessage('Name must be at least 3 chars long'),
    check('email').notEmpty().withMessage('Email address required.').isEmail().withMessage('Invalid email.'),
    check('password').notEmpty().withMessage('Password required').isLength({ min: 6, max: 30 }).withMessage('Password must be at least 6 chars - 30 chars long.'),
]

/** 
 * @swagger
 * /user:
 *    get:
 *      tags:
 *        - "User"
 *      summary: User json response
 *      description: Get user json response
 *      responses: 
 *        200:
 *          description: OK
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User[res]'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *        - User(token): []
 */
Router.get('/', requiredUser, (req, res, next) => {
    res.json({ user: req.user });
});


/** 
 * @swagger
 * /user/all:
 *    get:
 *      tags:
 *        - "User"
 *      summary: User json response
 *      description: Get All user json response
 *      responses: 
 *        200:
 *          description: OK
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User[res]'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *        - Admin(token): []
 */
Router.get('/all', requiredAdmin, (req, res, next) => {
    User.findAll({ attributes: ['id', 'username', 'name', 'email',] })
        .then(users => {
            res.json(users)
        })
});

/** 
 * @swagger
 * /user:
 *    post:
 *      tags:
 *        - "User"
 *      summary: Create user
 *      description: This can only be done by the logged in user.
 *      requestBody:
 *        description: "This json data that need to create new user account"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User[req]"
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User[res]"
 *        401:
 *          $ref: "#/components/responses/Unauthorized"   
 */
Router.post('/', schema, async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            throw new Error(errors.array()[0].msg)
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10).then(async password => password)
        req.body.password = hashedPassword

        const isUserNameUsed = await User.findOne({ where: { username: req.body.username } }).then(user => user ? true : false);
        if (isUserNameUsed) throw new Error('Username already used.');

        const { user, created } = await User.findOrCreate({ where: { email: req.body.email }, defaults: req.body })
            .then(async ([user, created]) => await { user, created })
        if (!created) {
            res.status(406);
            throw new Error('This email already registred.');
        } else {
            delete user.dataValues.password
            res.json({ user, message: 'Create successfully' })
        }
    } catch (error) {
        next(new Error(error.message));
    }
});

/** 
 * @swagger
 * /user/{id}:
 *    get:
 *      tags:
 *        - "User"
 *      summary: Get specific user response by user id
 *      description: Get specific user response by user id
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "This id use for getting specific user"
 *          required: true
 *          type: integer
 *          format: int64
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *        - User(token): []
 */
Router.get('/:id', requiredUser, (req, res, next) => {
    User.findOne({ where: { id: req.params.id } }).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }
        delete user.dataValues.password;
        res.json(user)
    })
})

/** 
 * @swagger
 * /user/{id}:
 *    patch:
 *      tags:
 *          - "User"
 *      summary: Update specific user response by user id
 *      description: Update specific user response by user id
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "This id use for getting specific user"
 *        required: true
 *        type: integer
 *        format: int64
 *      requestBody:
 *        description: "This json data that need to update this account"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User[req]"
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *        - User(token): []
 */
Router.patch('/:id', (req, res, next) => {
    res.json({
        message: 'Modify spacific user'
    })
})

/** 
 * @swagger
 * /user/{id}:
 *    delete:
 *      tags:
 *        - "User"
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
 *          description: "This id use for getting specific user"
 *          required: true
 *          type: integer
 *          format: int64
 *      responses: 
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User[res]"
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *      security:
 *          - User(token): []
 */
Router.delete('/:id', requiredUser, async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.params.id } }).then(user => user);
    try {
        if (!user) {
            throw new Error('User not exist.');
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password).then(isMatch => isMatch);
        if (!isPasswordMatch) {
            throw new Error('Password incorrect.');
        }
        const isDel = await User.destroy({ where: { id: req.params.id } }).then(isDel => isDel);
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
 *     Login[User]:
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
 * /user/login:
 *    post:
 *      tags:
 *      - "User"
 *      summary: Login to user panel
 *      description: Login to user panel
 *      consumes:
 *        - "application/json"
 *      requestBody:
 *        description: Login object that need to login
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Login[User]"        
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
            // return res.status(422).json(errors.array()[0]);
            throw new Error(errors.array()[0].msg)
        }
        const user = await User.findOne({ where: { email: req.body.email } }).then(user => user);
        if (!user) {
            throw new Error('This id not registered yet.')
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password).then(isMatch => isMatch);
        if (!isPasswordMatch) {
            throw new Error('Password incorrect.')
        }
        delete user.dataValues.password;
        const token = await jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.SECRET_USER, { expiresIn: '1d' })
        if (!isPasswordMatch) {
            throw new Error('Token creation failed.')
        }
        res.json({ user, token, message: 'login successful' });
    } catch (error) {
        res.status(404);
        next(new Error(error.message));
    }
})

module.exports = Router;