// 模拟token验证鉴权
// 使用jsonwebtoken中间件对token进行签名 生成token token = userInfo-expressTime-hashSign
// 使用koa-jwt中间件反编译和验证token

const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');

const jwt = require('jsonwebtoken');
const jwtAuth = require('koa-jwt');

// 秘钥 用来编译token的方式
const secret = "it's a secret";

const app = new Koa();

app.use(cors({
    credentials: true
}))

app.use(bodyparser());

app.use(static(__dirname + '/'));

// 配置签名key
app.keys = ['some secret'];


// 登录
router.post('/user/login', async ctx => {
    const { body } = ctx.request;

    // TODO: 这里缺少从数据库匹配用户环节

    ctx.body = {
        message: '登陆成功',
        // ⽣生成 token 返回给客户端
        token: jwt.sign(
            {
                data: body.useName, // 用户信息
                exp: Math.floor(Date.now() / 1000) + 60 * 60, // 过期时间
            },
            secret // 编译token的秘钥
        )
    }
})

// 获取数据
router.get(
    '/user/useInfo', 
    jwtAuth({
        secret // 使用秘钥反编译token 注入koa中
    }),
    async ctx => {
        // 编译过后信息存在ctx.state.user中

        console.log(ctx.state.user);

        ctx.body = {
            message: "获取数据成功",
            userinfo: ctx.state.user.data 
        };
    }
)

app.use(router.routes());

app.use(router.allowedMethods());

app.listen('8000', () => console.log('listen prot 8000'))