const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Orders = sequelize.define('Orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cost: {
    type: DataTypes.INTEGER,
  },

  date: {
    type: DataTypes.DATE,
    dafaultValue: Date.now,
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
