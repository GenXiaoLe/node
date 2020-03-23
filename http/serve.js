// 目标 写入一个页面
// 使用http打开一个端口服务
// 当地址是首页的时候读取首页文件，展示首页
// 当地址是用户地址的时候，在页面用一个接口写入用户信息
// 当获取到的是图片的时候 把他加载到界面中
// 界面不存在的时候 返回一个404


// 使用stream流来引入一个图片
// stream有一个入口fs.createReadStream 一个出口fs.createWriteStream 中间用管道pipe连接

const http = require('http');
const fs = require('fs');

const serve = http.createServer((request, response) => {
    console.log('open a service');

    const { url, method, headers } = request;
    console.log(url, method);
    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (error, data) => {
            if (error) {
                response.writeHead(500, { 'Content-type': 'text/plain;charset=utf-8' })
                response.end('服务器内部错误')
                return
            }

            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            response.end(data);
        });
    } else if (url === '/api/user' && method === 'GET') {
        response.writeHead(200, { 'Content-type': 'application/json' })
        response.end(JSON.stringify([{name: 'test-l', age: 28}]))
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        // headers.accept中包含请求的信息 其中图片请求包含image/*字段
        fs.createReadStream('./facvico.ico').pipe(response);
    } else {
        // 界面不存在返回404
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain;charset=utf-8');
        response.end('服务器内部错误')
    }
})

serve.listen(8000);