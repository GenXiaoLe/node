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
// 解析post请求
app.use(bodyParser());


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

const Router = require('koa-router')();

// 货品查询
Router.get('/products/getList', async (ctx) => {
    const products = await Product.findAll();
    ctx.body = { items: products }
})
// 货品添加
Router.post('/products/add', async (ctx) => {
    // koa-bodyparser解析
    const body = ctx.request.body;
    await ctx.user.createProduct(body);
    ctx.body = {
        success: true
    }
})
// 货品删除
Router.delete('/products/:id', async (ctx) => {
    const id = ctx.params.id;
    await Product.destroy({
        where: {
            id
        }
    })
    ctx.body = {
        success: true
    }
})

// 获取购物车内容
Router.get('/cart/list', async (ctx) => {
    const cart = await ctx.user.getCart();
    const product = await cart.getProducts();
    ctx.body = { items: product };
})

// 添加购物车
Router.post('/add/cart', async (ctx) => {
    const body = ctx.request.body;
    // 货品id
    const productId = body.id;
    // 货品个数
    const quantity = 1;

    // 这里需要判断 购物车里有无该货品 有的话 number+1 没有的话直接写入购物车

    // 首先获取购物车
    const cart = await ctx.user.getCart();
    // 查找购物车内有无该货品
    const fetchCart = cart;
    const productFind = await cart.getProducts({
        where: {
            id: productId
        }
    })

    // productFind 返回的是数组 判断有无货品
    let product;
    if (productFind.length > 0) {
        product = productFind[0];
    }

    if (product) {
        // 如果有product 则在把这个货品数量+1 货品数量在中间表cartItem中
        quantity = product.cartItem.quantity + 1;
    } else {
        // 如果没有 则从货品的表中找到该货品直接插入到购物车中
        product = await Product.findByPk(productId);
    }

    await fetchCart.addProduct(
        product, 
        {
            through: {
                quantity
            }
        }
    )

    ctx.body = { success: true }
})

// 删除购物车的数据
Router.delete('/cart/:id', async (ctx) => {
    const id = ctx.params.id;

    // 先获取到用户关联的购物车
    const cart = await ctx.user.getCart();
    // 找出用户关联购物车里的货品
    const products = await cart.getProducts({
        where: { id }
    });

    // 删除货品关联的购物车里的货品
    const product = products[0];
    await product.cartItem.destroy();
    ctx.body = { success: true }
})

// 购物车加入到订单
Router.post('/add/order', async (ctx) => {
    // 创建订单要找到用户关联的购物车 然后找到购物车中的商品 创建用户关联的订单 然后把货品利用货品和订单的中间表加入到订单中
    // 找到用户关联的购物车
    const cart = await ctx.user.getCart();
    const fetchCart = cart;
    // 找到购物车里的货品
    const product = await cart.getProducts();

    // 创建用户关联的订单
    const order = await ctx.user.createOrder();

    // 在订单中添加货品
    const res = await order.addProduct(
        // 循环货品 给货品和订单中间表中的quantity赋值
        product.map(p => {
            p.orderItem = {
                quantity: p.cartItem.quantity
            }
            return p;
        })
    )

    // 最后清空购物车
    await fetchCart.setProducts(null);

    ctx.body = { success: true }
})

// 获取购物车
Router.get('/order/getList', async (ctx) => {
    const order = await ctx.user.getOrders(
        {
            include: [
                // 简单外联 获取订单关联的货品数据
                'products'
            ],
            order: [
                // 排序
                ['createdAt', 'DESC']
            ]
        }
    )

    ctx.body = { items: order }
})

app.use(Router.routes())


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
sequelize.sync().then(
    async () => {
        // User.findByPk(1);
        let user = await User.findByPk(1);

        if (!user) {
            // 插入一条数据
            user = await User.create({
                name: 'xiaobai',
                email: '551832@qq.com'
            });
            // 关联多表以后 use可以调用cart和product的Sequelize类
            await user.createCart();
        }

        app.listen(9090, () => {
            console.log('listen prot 9090');
        })
    }
)


