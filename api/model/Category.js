const { Sequelize, DataTypes } = require('sequelize');
const database = require('../../db');

module.exports = database.define('Category', {
  title: {
      type: DataTypes.STRING,
      allowNull: false
  },
  slag: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  root: {
      type: DataTypes.STRING,
      allowNull: true
  }
})