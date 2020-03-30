// 封装一个类连接数据库 
// 目的是连接数据库 并使用event订阅模式 完成如下工作
// 1. 连接数据库 并在连接成功时 发送connect事件 表示连接成功
// 2. 写一个once事件 主要用于监听订阅的事件 并在响应时执行会调用执行回调函数
// 3. 写一个col事件 主要用于连接某个数据库和表 并返回该客户端


const config = require('../config.js');
const Emitter = require('events').EventEmitter;

const { MongoClient } = require('mongodb');

class MongoDB {
    constructor(conf) {
        this.conf = conf;

        this.event = new Emitter();

        // 创建客户端
        this.client = new MongoClient(
            conf.url,
            { useNewUrlParser: true }
        )

        // 创建连接
        this.client.connect(error => {
            if (error) {
                throw error;
            }

            this.event.emit('connect')

            console.log('连接 MongoDB 成功~~~~')
        })
    }

    // 接收事件名和回调 用于监听事件
    once(eventName, cb) {
        this.event.once(eventName, cb);
    }

    // 接收表名和库名 库名默认配置项的库
    col(colName, dbName = this.conf.dbName) {
        return this.client.db(dbName).collection(colName);
    }
}

module.exports = new MongoDB(config);