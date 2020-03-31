// session 鉴权实战小例子
// 1. 配置跨域 签名 根目录 post解析等一系列中间件
// 2. 在访问接口之前判断用户访问的页面或接口是否是白名单的 再先去验证用户信息 判断有无权限

const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors') // 解决跨域
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');
const session = require('koa-session');

const app = new Koa();

// 解决跨域
app.use(cors({
    credentials: true
}))

// 配置签名key
app.keys = ['some secret'];

app.use(session(app));

// 定位到根目录
app.use(static(__dirname + '/'));

app.use(bodyparser());

// 用户登入判断
app.use(async (ctx, next) => {
    const url = ctx.url;

    if (url.indexOf('login') > -1) {
        // 如果是登录相关 则处于白名单 允许通过
        await next();
    } else {
        const useInfo = ctx.session.useInfo;
        console.log('session-useInfo', useInfo);

        if (!useInfo) {
            // 如果需要验证 且用户session不存在
            ctx.body = {
                message: '对不起，请登录'
            }
        } else {
            await next();
        }
    }
})

// 用户登录
router.post('/user/login', async (ctx) => {
    // 获取参数
    const { body } = ctx.request;

    console.log('body', body.useName);

    // TODO: 这里缺少从数据库匹配用户环节
    // 登陆之后设置session
    ctx.session.useInfo = body.useName;

    ctx.body = {
        message: '登陆成功'
    }
})

// 用户登出
router.post('/user/logout', async (ctx) => {
    // 获取参数
    const { body } = ctx.request;

    // TODO: 这里缺少从数据库匹配用户环节
    // 登出之后删除session
    delete ctx.session.useInfo;

    ctx.body = {
        message: '登出成功'
    }
})


// 查询用户信息
router.get('/user/useInfo', async (ctx) => {
    // 返回查询到的数据
    ctx.body = {
        info: {
            message: '查询成功',
            useName: ctx.session.useInfo
        }
    }
})


app.use(router.routes());

app.listen('8000', () => console.log('listen prot: 8000'))

