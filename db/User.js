const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const Orders = require('./Orders')

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
    type: DataTypes.ENUM('iCustomer', 'iExecutor') ,
  
  },
 
}, {
  paranoid: true
});

const Orders = sequelize.define('Orders', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  categories: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      //allowNull: false,
  },
  name: {
      type: DataTypes.STRING, 
      allowNull: false
  },
  description: {
      type: DataTypes.TEXT,
      allowNull: false
  }, 
  cost: {
      type: DataTypes.INTEGER
  }, 
  //это под вопросом
  date: {
      type: DataTypes.DATE,
      dafaultValue: Date.now
  },

 imageSrc : {
     type: DataTypes.TEXT,
     dafaultValue: ''
 }
 
})


Users.hasMany(Orders)

exports = module.exports = {
  sequelize,
  Users,
};
