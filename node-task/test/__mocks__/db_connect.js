const {Sequelize,DataTypes} = require('sequelize')

const sequelize = new Sequelize({
    database: "student_details",
    username: 'root',
    password: 'root@123',
    host: "localhost",
    dialect: "mariadb",
})

const authenticate = jest.fn(()=> Promise.resolve());
sequelize.authenticate= authenticate

module.exports = sequelize