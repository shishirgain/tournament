const { Sequelize, DataTypes } = require('sequelize');
const database = require('../../db');

module.exports = database.define('Rating', {
  postId: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  userId: {
      type: DataTypes.INTEGER,
      allowNull: true
  },
  rating: {
      type: DataTypes.INTEGER,
      allowNull: true
  }
})