const { Sequelize, DataTypes } = require('sequelize');
const database = require('../../db');

module.exports = database.define('User', {
  username: {
      type: DataTypes.STRING,
      allowNull: true
  },
  name: {
      type: DataTypes.STRING,
      allowNull: true
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  }
})