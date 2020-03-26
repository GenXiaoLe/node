// 使用koa koa-bodyparser koa-static koa-router

// koa-bodyparser 对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中 
// 详情https://chenshenhai.github.io/koa2-note/note/request/post-use-middleware.html

// koa-static 静态资源加载
// 详情https://chenshenhai.github.io/koa2-note/note/static/middleware.html

const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')

// 解决跨域
// var cors = require('koa-cors');
// app.use(cors());

// 请求定位到根目录
app.use(require('koa-static')(__dirname + '/'));
app.use(bodyParser);


// 初始化数据库
const sequelize = require('./utils/database');
// 初始化数据库中所有的表
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const OrderItem = require('./models/order-item');

// 模拟权鉴
app.use(async (ctx, next) => {
    const user = await User.findByPk(1);
    ctx.user = user;
    await next();
})

// 写入api
// 共有三个界面 商品 购物车 订单
// 商品有增删查以及添加到购物车
// 购物车有查删和添加到订单
// 订单有查

const router = require('koa-router')();

// 货品查询
router.get('/goods/getList', async (ctx, next) => {
    const list = await Product.findAll();

    ctx.body = { list };
})
// 货品添加
router.post('/goods/add', async (ctx, next) => {
    // koa-bodyparser解析
    const body = ctx.request.body;
    await ctx.user.createProduct(body);
    ctx.body = {
        success: true
    }
})
// 货品删除
router.delete('/goods/delete/:id', async (ctx, next) => {
    const id = ctx.params.id;
    await Product.destroy({
        where: id
    });
    ctx.body = {
        success: true
    }
})

app.use(router.routes())


// 关联数据库
// 商品和用户是一对多的关系
Product.belongsTo(
    User,
    {
        constraints: true,
        onDelete: 'CASCADE'
    }
)

User.hasMany(Product);
// 用户和购物车是一对一的关系
User.hasOne(Cart);
Cart.belongsTo(User);
// 用户和订单式一对多的关系
Order.belongsTo(User);
User.hasMany(Order);
// 商品和购物车是多对多的关系
Cart.belongsToMany(
    Product,
    {
        through: CartItem // 使用中间表关联
    }
);
Product.belongsToMany(
    Cart,
    {
        through: CartItem // 使用中间表关联
    }
);
// 商品和订单是多对多的关系
Order.belongsToMany(
    Product,
    {
        through: OrderItem // 使用中间表关联
    }
);
Product.belongsToMany(
    Order,
    {
        through: OrderItem // 使用中间表关联
    }
);

// 同步数据库 如果没有用户需要创建一个用户来模拟登陆权鉴
sequelize.sync({force: true}).then(
    async () => {
        let user = User.findByPk(1);

        if (!user) {
            // 插入一条数据
            user = await User.creat({
                name: 'xiaobai',
                email: '551832@qq.com'
            });
            // TODO: createCart来源 猜测关联多表以后 use可以调用cart和product的Sequelize类
            await user.createCart();
        }

        app.listen(9090, () => {
            console.log('listen prot 9090');
        })
    }
)


