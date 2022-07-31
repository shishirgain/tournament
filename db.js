const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'temp/data.sqlite'
});


// const database = new Sequelize('DB_NAME', 'USER_ID', 'PASSWORD', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// });

module.exports = sequelize;