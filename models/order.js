// require the sequelize constructor class
const Sequelize = require('sequelize');

// import our own sequelize object
const sequelize = require('../utility/database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Order;