const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Admin = require('../model/Admin');

async function requiredUser(req, res, next) {
    try {
        const authHeader = req.get('authorization');
        if (!authHeader) {
            throw new Error('Unauthorized');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token failed.');
        }
        const tokenInfo = await jwt.verify(token, process.env.SECRET_USER);
        const user = await User.findOne({ where: { id: tokenInfo.id, email: tokenInfo.email }, attributes: ['id', 'name', 'username', 'email'] }).then(user => user);
        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        next(new Error(error.message));
    }
}
async function requiredAdmin(req, res, next) {
    try {
        const authHeader = req.get('authorization');
        if (!authHeader) {
            throw new Error('Unauthorized');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token failed.');
        }
        const tokenInfo = await jwt.verify(token, process.env.SECRET_ADMIN)
        const admin = await Admin.findOne({ where: { id: tokenInfo.id, email: tokenInfo.email }, attributes: ['id', 'type', 'name', 'email'] }).then(admin => admin);
        delete admin.dataValues.password;
        req.admin = admin;
        next();
    } catch (error) {
        res.status(401);
        next(new Error(error.message));
    }
}

async function requiredSuperAdmin(req, res, next) {
    const typeList = ['super', 'admin'];
    let step = req.query.step;
    if (step === process.env.SUPER_ADMIN_SKIP) {
        next();
        return;
    }
    try {
        const authHeader = req.get('authorization');
        if (!authHeader) {
            throw new Error('Unauthorized');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token failed.');
        }
        const tokenInfo = await jwt.verify(token, process.env.SECRET_ADMIN)
        const admin = await Admin.findOne({ where: { id: tokenInfo.id, email: tokenInfo.email }, attributes: ['id', 'type', 'name', 'email'] }).then(admin => admin);
        delete admin.dataValues.password;
        if (admin.type === typeList[0]) {
            req.admin = admin;
        } else {
            res.status(401);
            throw new Error('Unauthorized');
        }
        next();
    } catch (error) {
        res.status(401);
        next(new Error(error.message));
    }
}

module.exports = {
    requiredUser,
    requiredAdmin,
    requiredSuperAdmin
}