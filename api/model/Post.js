const { Sequelize, DataTypes } = require('sequelize');
const database = require('../../db');

module.exports = database.define('Post', {
  title: {
      type: DataTypes.STRING,
      allowNull: false
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  content: {
      type: DataTypes.STRING,
      allowNull: true
  }
})