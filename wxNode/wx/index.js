const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
const axios = require('axios');
const config = require('./config.js');
const { ServerToken } = require('./mongoose.js');

const app = new Koa()
app.use(bodyParser())
const router = new Router()
app.use(static(__dirname + '/'))

// 消息接口解析 接收wx发来的消息
// 需要在微信公众号页面配置接口
const weChat = require('co-wechat');

// 使用config配置配合隧道映射到公众号上
router.all('/wechat', weChat(config).middleware(
    async message => {
        console.log('weChat', message);
        return `hello word !! --- ${message.Content}`;
    }
))

// // 获取token
// const tokenCache = {
//     access_token: '', // 请求必填toekn
//     updateTime: new Date(), // 更新时间
//     expires_in: 7200 // 过期时间 
// }

// router.get('/getToken', async ctx => {
//     // 获取微信接口文档地址
//     // https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
//     // http请求方式
//     // GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
//     const wxDomain =  `https://api.weixin.qq.com`;
//     const path = `/cgi-bin/token`;
//     const param = `?grant_type=client_credential&appid=${config.appid}&secret=${config.appsecret}`;
//     const url = wxDomain + path + param;
//     const res = await axios.get(url);
//     console.log('获取成功', res);

//     Object.assign(tokenCache, res.data, { updateTime: new Date() });

//     ctx.body = res.data;
// })

// // 获取关注人信息
// router.get('/getFollows', async ctx => {
//     // https://developers.weixin.qq.com/doc/offiaccount/User_Management/Getting_a_User_List.html
//     // GET https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
//     const wxDomain =  `https://api.weixin.qq.com`;
//     const path = `/cgi-bin/user/get`;
//     const param = `?grant_type=client_credential&access_token=${tokenCache.access_token}`;
//     const url = wxDomain + path + param;
//     const res = await axios.get(url);
//     console.log('获取用户列表成功', res);
//     ctx.body = res.data;
// })

// 每次获取token很麻烦 使用co-wechat-api库 内部集成了获取和发送access_token
const wechatApi = require('co-wechat-api');

// 实例化并传入app信息
const api = new wechatApi(
    config.appid, 
    config.appsecret,
    // 取Token
    // async () => await ServerToken.findOne(),
    // 存Token
    // async () => {
    //     const res = ServerToken.updateOne(
    //         {},
    //         token,
    //         { upsert: true }
    //     )
    // }
);

// 获取关注者列表
router.get('/getFollows', async ctx => {
    var res = await api.getFollowers();
    // ctx.body = res;
    // 改造一下 可以获取具体的关注人信息
    res = await api.batchGetUsers(res.data.openid, 'zh_CN');
    console.log(res);
    ctx.body = res;
})


app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000, () => console.log('node listen prot 3000'));