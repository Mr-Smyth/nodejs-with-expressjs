// This gives us a constructor called Sequelize
const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

// define a model - managed by sequelize
// define takes (model name in lowercase, {define the structure - the fields our model should have})
const product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    // define the title using shorthand, to only set the type (example)
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = product;