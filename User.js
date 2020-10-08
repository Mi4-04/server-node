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
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
/*sequelize
  .sync()
  .then(() => console.log('Database is ready'))
  .catch((err) => cosnole.log(err));*/

exports = module.exports = {
  sequelize,
  Users,
};
