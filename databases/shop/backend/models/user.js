const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

// 定义模型字段 创建表
// 用户包含的字段 id int name string email string
const User = sequelize.define(
    'users', 
    {
        // id: {
        //     type: Sequelize.DataTypes.UUID,
        //     defaultValue: Sequelize.DataTypes.UUIDV1,
        //     primaryKey: true
        // },
        id : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING
    }
);

module.exports = User;
