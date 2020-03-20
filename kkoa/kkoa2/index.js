const KKoa2 = require('./kkoa2');

const app = new KKoa2();

app.use(async (ctx, next) => {
    ctx.body = '1';
    await next();
    ctx.body += 2;
})

app.use(async (ctx, next) => {
    ctx.body += 3;
    await next();
    ctx.body += 4;
})

app.use(async (ctx, next) => {
    ctx.body += 5;
    await next();
    ctx.body += 6;
})

function delay() {
    return new Promise((reslove) => {
            setTimeout(() => { 
                reslove();
            }, 2000); 
        }
    )
};

app.listen(3000, () => {
    console.log('3000 端口服务已启动 欢迎使用koa2')
})