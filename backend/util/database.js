const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'LearnSQL@#23', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;