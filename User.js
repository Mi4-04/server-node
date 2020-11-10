const Sequelize = require('sequelize')
const sequelize = new Sequelize("servernode", "zakharovm", "zakharovm", {
    dialect: "postgres",
    host: "localhost",
    port: 5432
})

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
    type: DataTypes.ENUM('iCustomer', 'iExecutor') ,
  
  },
  
});

exports = module.exports = {
    sequelize,
    Users
}
