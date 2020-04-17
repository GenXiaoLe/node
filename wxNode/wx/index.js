const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
const axios = require('axios');
const config = require('./config.js');

const app = new Koa()
app.use(bodyParser())
const router = new Router()
app.use(static(__dirname + '/'))

// 获取token
const tokenCache = {
    access_token: '', // 请求必填toekn
    updateTime: new Date(), // 更新时间
    expires_in: 7200 // 过期时间 
}

router.get('/getToken', async ctx => {
    // 获取微信接口文档地址
    // https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
    // http请求方式
    // GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    const wxDomain =  `https://api.weixin.qq.com`;
    const path = `/cgi-bin/token`;
    const param = `?grant_type=client_credential&appid=${config.appid}&secret=${config.appsecret}`;
    const url = wxDomain + path + param;
    const res = await axios.get(url);
    console.log('获取成功', res);

    Object.assign(tokenCache, res.data, { updateTime: new Date() });

    ctx.body = res.data;
})

// 获取关注人信息
router.get('/getFollows', async ctx => {
    // https://developers.weixin.qq.com/doc/offiaccount/User_Management/Getting_a_User_List.html
    // GET https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
    const wxDomain =  `https://api.weixin.qq.com`;
    const path = `/cgi-bin/user/get`;
    const param = `?grant_type=client_credential&access_token=${tokenCache.access_token}`;
    const url = wxDomain + path + param;
    const res = await axios.get(url);
    console.log('获取用户列表成功', res);
    ctx.body = res.data;
})

// 消息接口解析 接收wx发来的消息
// TODO 待测试
const weChat = require('co-wechat');

router.all('/weChat', weChat(config).middleware(
    async message => {
        console.log('weChat', message);
        return `hello word !! --- ${message}`;
    }
))



app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000, () => console.log('node listen prot 3000'));