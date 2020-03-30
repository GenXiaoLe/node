// mongoose 的简单使用
const mongoose = require('mongoose');


// 连接mongodb和数据库
mongoose.connect(
    'mongodb://localhost:27017/test',
    {
        useNewUrlParser: true
    }
)

// 获取连接实例
const conn = mongoose.connection;

conn.on('error', () => console.log('数据库连接失败'));

conn.on('open', async () => {
    
})