const koa = require('koa');
const app = new koa();
const session = require('koa-session');

// 设置签名的key值 用来对session存取的value签名 ⽤来对cookie进⾏行行签名
// 签名的作用 相当于对cookie以某种自己设定方式进行的简写 外界无法破译 如果cookie发生篡改 签名回合cookie不一致 防止被外部攻击
app.keys = ['some secret'];

// 配置项
const SESSION_CONFIG = {
    key: 'session_sign', // cookie键名
    maxAge: 86400000, // 有效期，默认⼀一天
    httpOnly: true, // 仅允许服务器修改
    signed: true, // 签名cookie
}

// 注册中间件
app.use(session(SESSION_CONFIG, app));


app.use(ctx => {
    if (ctx.path === '/favicon.ico') return;

    // 获取cookie ctx.session 即之前的内存

    let n = ctx.session.count || 0;

    ctx.session.count = ++n;

    ctx.body = `第${n}次访问`
})

app.listen(8000);