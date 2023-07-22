// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'LearnSQL@#23'
// });

// module.exports = pool.promise()

// ---------------------------------------------

// Import Sequelize constructor/class
const Sequelize = require('sequelize');

// Create a new instance by calling the constructor
const sequelize = new Sequelize('node-complete', 'root', 'LearnSQL@#23', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;