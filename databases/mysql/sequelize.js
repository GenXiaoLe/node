// 基于mysql2的中间件sequelize 连接数据库
// 好处是可以以对象方式调用 更接近js编程思想
(
    async () => {
        const Sequelize = require('sequelize');

        // 实例化库 创建连接对象 并连接数据库
        const sequelize = new Sequelize(
            "mysql_test", // database
            "root", // user
            "418356233", // password
            {
                host: 'localhost',
                dialect: "mysql", // 标明使用的数据库类型为mysql
                operatorsAliases: false // 仍可通过传⼊入 operators map 至 operatorsAliases 的⽅方式来使⽤用字符串串运算符，但会返回弃⽤用警告
            }
        )

        // 定义模型字段 创建表 表名为Fruit 字段为name price stock
        const Fruit = sequelize.define(
            "Fruit", 
            {
                // 这个库可以自动生成id 但为了保险起见 可以自己设置uuid
                id: {
                    type: Sequelize.DataTypes.UUID,
                    defaultValue: Sequelize.DataTypes.UUIDV1,
                    primaryKey: true
                },
                name: { type: Sequelize.STRING(20), allowNull: false },
                price: { type: Sequelize.FLOAT, allowNull: false }, 
                stock: { type: Sequelize.INTEGER, defaultValue: 0 }
            },
            { 
                timestamps: false // 阻止自动生成时间
            }
        );

        // 同步数据库 若传参为true 则每次同步全都会删除旧的表数据
        let ret = await Fruit.sync({force: true});

        console.log(`sync ${ret}`)

        // 插入数据
        ret = await Fruit.create({
            name: "⾹香蕉",
            price: 3.5
        })

        console.log(`create ${ret}`);

        // 查找数据
        // 找到所有数据
        ret = await Fruit.findAll();

        // 根据条件 更新数据
        await Fruit.update(
            { price: 4.5 },
            { where: { name: '⾹香蕉' } }    
        )

        console.log('findAll',JSON.stringify(ret))

        // 根据条件 筛选数据
        // 先用库里的操作符设定条件变量
        const Op = Sequelize.Op;

        ret = await Fruit.findAll({
            where: { price: { [Op.it]: 5, [Op.gt]: 4 } }
        })

        console.log('findAll', JSON.stringify(ret, '', '\t'))
    }
)()