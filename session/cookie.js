// 模拟一下session的环境和原理
// 1. session 实质上是指在后端存入一个cookie 每次提交请求后先去判断该cookie是否存在之前的session库中 存在则有权限 反之没有
// 2. 首先我们需要有一个对象来存入所有的session集合 这里保存在内存中是防止cookie被查到导致信息泄露
// 3. 访问接口时候先去判断有没有cookie 如果没有则说明没权限 需要登录 这里直接生成一个session
// 4. 先创建session的value值 一般为了安全 这个value值一般是一个签名
// 5. 然后把这个value值写入cookie 并在session中保存下来
// 6. 如果有cookie 则在cookie中把签名取出 再从session中取出具体内容信息

const http = require('http');

// 保存所有session的地方
const session = {};

http.createServer((req, res) => {
    // 先排除首页icon的干扰
    if(req.url === '/favicon.ico'){
        res.end('')
        return;
    }

    const cookie = req.headers.cookie;
    // cookie存入的key
    const sessionKey = 'sid';
    console.log(cookie);

    if (cookie) {
        // 如果cookie存在
        // 写一个正则过滤字段
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
        const _cookieInfo = pattern.exec(cookie)[1];

        // 拿到sid 取出内容
        const useInfo = session[_cookieInfo];
        res.end(`welcome ${useInfo.name}`)
    } else {
        // 如果cookie不存在
        // 设置value
        const sid = (Math.random() * 9999999).toFixed();
        // 写入cookie
        res.setHeader('Set-Cookie', `${sessionKey}=${sid};`)
        // 将签名value存入内存session 存入真实数据
        session[sid] = { name: 'xiaoming' };
        res.end('plase login, u dont login')
    }
    res.end('write')

}).listen(8000)