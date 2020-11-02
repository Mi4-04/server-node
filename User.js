const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

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
    allowNull: false,
    isAlpha: true,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    isAlpha: true, 
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    isAlpha: true, 
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    isAlpha: true, 
  },
  typeUser: {
    type: DataTypes.STRING,
  
  },
  
});

exports = module.exports = {
  sequelize,
  Users,
};
