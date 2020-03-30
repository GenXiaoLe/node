// 初始化表 添加测试数据

const mongodb = require('./models/db.js');

// 监听connect 在连接成功时自动插入数据
mongodb.once('connect', async () => {
    // 获取客户端
    const client = await mongodb.col('fruits')

    // 先清空表数据
    client.deleteMany();

    // 创建新数据
    const data = new Array(100).fill().map((v, i) => ({ name: `瓜果${i}`, price: 1, category: Math.random() > 0.5 ? '水果' : '蔬菜' }))

    // 插入数据
    await client.insertMany(data);

    console.log('插入数据成功')
})