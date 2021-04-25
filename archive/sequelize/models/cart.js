// require the sequelize constructor class
const Sequelize = require('sequelize');

// import our own sequelize object
const sequelize = require('../utility/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;