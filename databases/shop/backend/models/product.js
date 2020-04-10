const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// id int title string price double description string
const Product = sequelize.define(
    "product",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

module.exports = Product;