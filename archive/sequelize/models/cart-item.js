// require the sequelize constructor class
const Sequelize = require('sequelize');

// import our own sequelize object
const sequelize = require('../utility/database');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem;