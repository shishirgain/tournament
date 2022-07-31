const { Sequelize, DataTypes } = require('sequelize');
const database = require('../../db');

module.exports = database.define('File', {
  title: {
      type: DataTypes.STRING,
      allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  path: {
      type: DataTypes.STRING,
      allowNull: true
  },
  size: {
      type: DataTypes.STRING,
      allowNull: true
  },
  url: {
      type: DataTypes.STRING,
      allowNull: true
  },
  isVisiable: {
      type: DataTypes.BOOLEAN,
      allowNull: true
  },
})