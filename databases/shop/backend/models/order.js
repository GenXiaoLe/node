const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// id int
const Order = sequelize.define(
    "order",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    }
);

module.exports = Order;