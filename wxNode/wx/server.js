// 目的是解析co-wechat原理和源码 分析公众号是怎么实现消息发送的
const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const xml2js = require('xml2js'); // 创建的xml数据
const url = require('url');
const crypto = require('crypto'); // 生成hash的库

const xmlParser = require('koa-xml-body') // 和bodyparser一样 解析得是xml
const config = require('./config.js');
const app = new Koa()
app.use(xmlParser());
const router = new Router()
app.use(static(__dirname + '/'))

// 验证微信返回的hash信息 这里是我们的服务去验证微信 防止被第三方攻击
// 具体是依靠我们的token以及微信生成hash的方式 生成hash 判断微信传过来的和我们生成的是否一致
router.get('/wechat', async ctx => {
    console.log('微信认证...', ctx.url)
    // 使用url库 结构出来微信返回的url信息
    const { query } = url.parse(ctx.url, true);
    const {
        signature, // 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
        timestamp, // 时间戳
        nonce, // 随机数 
        echostr // 随机字符串
    } = query;

    // 拿到微信返回的信息 和 我们的token进行拼装和hash 然后去对比签名
    console.log('wechat', query)

    let hashStr = [config.token, timestamp, nonce].sort().join('');

    console.log(hashStr);

    let _hash = crypto.createHash('sha1').update(hashStr).digest('hex');

    console.log(`自己加密后的字符串为：${_hash}`);
    console.log(`微信传入的加密字符串为：${signature}`);
    console.log(`两者比较结果为：${signature == _hash}`);

    if (signature == _hash) {
        ctx.body = echostr;
    } else {
        ctx.body = '返回数据的不是微信';
    }
})

// 验证通过以后可以接收消息
router.post('/wechat', async ctx => {
    const { xml: message } = ctx.request.body;
    console.log('Receive:', message);

    const xml = new xml2js.Builder();

    const result = xml.buildObject({
        xml: {
            ToUserName: msg.FromUserName,
            FromUserName: msg.ToUserName,
            CreateTime: Date.now(),
            MsgType: msg.MsgType,
            Content: 'Hello ' + msg.Content
        }
    });

    ctx.body = result;
})

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);