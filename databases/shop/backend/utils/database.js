const Sequelize = require("sequelize");
const env = require("dotenv");
const config = require("./config.js");

env.config();

// 实例化库 创建连接对象 并连接数据库
const sequelize = new Sequelize(
    config.database, // database
    config.username, // user
    config.password, // password
    {
        host: config.host,
        dialect: "mysql", // 标明使用的数据库类型为mysql
        operatorsAliases: false // 仍可通过传⼊入 operators map 至 operatorsAliases 的⽅方式来使⽤用字符串串运算符，但会返回弃⽤用警告
    }
)

module.exports = sequelize;