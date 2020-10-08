const Sequelize = require('sequelize');
const sequelize = new Sequelize('servernode', 'zakharovm', 'zakharovm', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

module.exports = sequelize;
