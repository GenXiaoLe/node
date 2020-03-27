// koa 基础使用
const Koa = require('koa');
const app = new Koa();

// 使用路由中间件
const Router1 = require('koa-router')();

// 路由实验
// 不使用中间件
// const router = {};

// router['/user'] = ctx => {
//     ctx.type = 'text/html;charset=utf-8';
//     ctx.body = `我的名字是${ctx.body.name}, 今年${ctx.body.age}岁了`;
// }

// 使用中间件
Router1.get('/user', async (ctx, next) => {
    console.log('this is router');
    ctx.type = 'text/html;charset=utf-8';
    ctx.body = `我的名字是tom, 今年18岁了`;
})

Router1.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string';
    next();
})
app.use(Router1.routes());



app.use(async (ctx, next) => {
    ctx.body = {
        name: 'tom',
        age: 18
    };
    await next();
})

app.use(async (ctx, next) => {
    console.log(`url ----- ${ctx.url}`);

    // if (ctx.url === '/user') {
    //     ctx.type = 'text/html;charset=utf-8';
    //     ctx.body = `我的名字是${ctx.body.name}, 今年${ctx.body.age}岁了`;
    // }

    // const fun = router[ctx.url];
    // fun && fun(ctx);
    await next();
})

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    console.log(`start ------ ${start}`);
    await next();
    const end = new Date().getTime() - start;
    console.log(`end ------ ${end}ms`);
})

app.use(async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('delyp')
            resolve();
        }, 1000)
    })
})


app.listen(8888)