const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Orders = sequelize.define('Orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  cost: {
    type: DataTypes.INTEGER,
  },

  date: {
    type: DataTypes.INTEGER,
  },

  imageSrc: {
    type: DataTypes.STRING,
    dafaultValue: '',
  },

});

module.exports = {
  sequelize,
  Orders,
};
