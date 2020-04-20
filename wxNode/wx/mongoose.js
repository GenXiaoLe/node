// 使用mongo或者rides等保存access_token实现数据持久化
const mongoose = require('mongoose');

// 连接数据库并创建access_token模型
const { Schema } = mongoose;

mongoose.connect(
    'mongodb://', 
    {
        useNewUrlParser: true
    },
    () => console.log('Mongodb connected..')
)

// 创建模型
exports.ServerToken = mongoose.model('ServerToken', { accessToken: String });