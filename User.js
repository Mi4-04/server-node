const Sequelize = require('sequelize')
const sequelize = new Sequelize("servernode", "zakharovm", "zakharovm", {
    dialect: "postgres",
    host: "localhost",
    port: 5432
})

const Users = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

sequelize.sync().then(() => console.log("Database is ready"))

exports = module.exports = {
    sequelize,
    Users
}