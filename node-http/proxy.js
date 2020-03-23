// 实现跨域代理

const express = require('express');
const app = express();

// 使用proxy中间件实现代理
const proxy = require('http-proxy-middleware');
const createProxyMiddleware = proxy.createProxyMiddleware;

// 使用express中生成静态地址方法 定位到根目录的index.html
app.use(express.static(__dirname + '/'));

// 把api代理到其他地址
app.use(
    '/api', 
    createProxyMiddleware({
        target: 'http://localhost:8000', // 将api请求代理到8000端口上
        changeOrigin: false
    })
)

// 监听一个其他域名
app.listen(9000)