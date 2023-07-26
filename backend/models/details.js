const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Item = sequelize.define('storeitem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    itemName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: Sequelize.STRING,
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = Item;