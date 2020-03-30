(
    async () => {
        // 结构处mongo连接实例
        const { MongoClient } = require('mongodb');

        // 创建客户端
        const client = new MongoClient(
            'mongodb://localhost:27017', // mongo地址
            {
                //userNewUrlParser这个属性会在url⾥识别验证⽤用户所需的db
                userNewUrlParser: true
            }
        )

        // 创建连接
        let ret = await client.connect();

        // 连接db 其实就是连接数据库
        let db = await client.db('test');

        // 连接表
        let fruits = await db.collection('fruits')

        // 添加文档
        ret = await fruits.insertOne({
            name: '芒果',
            price: 10
        })
        console.log('插⼊入成功', JSON.stringify(ret))

        // 查询第一条
        ret = await fruits.findOne();
        console.log('查询第一条', ret);

        // 更新文档 使用操作符$set
        ret = await fruits.update(
            { name: '芒果' },
            { $set: {name: '橘子'} }
        )

        console.log('更新⽂文档', JSON.stringify(ret.result))

        // 删除文档
        ret = await fruits.deleteOne(
            { name: '橙子' }
        )
        
        // 删除全部数据
        // await fruits.deleteMany();

        client.close();
    }
)()