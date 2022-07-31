const express = require('express');
const Router = express.Router();

// Swagger Docs setup
Router.use('/docs', require('./swagger'));

// Router
Router.use('/', require('./router/home'));
Router.use('/user', require('./router/user'));
Router.use('/admin', require('./router/admin'));
Router.use('/post', require('./router/post'));
Router.use('/category', require('./router/category'));
Router.use('/file', require('./router/file'));
Router.use('/rating', require('./router/rating'));

// Error handle
Router.use((req, res, next) => {
    res.status(404);
    next(new Error('Not Fount -' + req.url));
})

Router.use((err, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message
    });
})

module.exports = Router;