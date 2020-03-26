const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// id int quantity int 购物车数字
const CartItem = sequelize.define(
    "cartItem",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true, // 自增
            allowNull: false,
            primaryKey: true // 主键
        },
        quantity: {
            type: Sequelize.INTEGER,
        }
    }
);

module.exports = CartItem;