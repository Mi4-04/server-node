const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const { Orders } = require('./Orders')

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    isAlpha: true,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    isAlpha: true,
  },
  country: {
    type: DataTypes.STRING,
    isAlpha: true,
  },
  city: {
    type: DataTypes.STRING,
    isAlpha: true,
  },
  typeUser: {
    type: DataTypes.ENUM('iCustomer', 'iExecutor'),

  },

}, {
  paranoid: true,
});

Users.hasMany(Orders)
Orders.belongsTo(Users)

module.exports = {
  sequelize,
  Users,
};
