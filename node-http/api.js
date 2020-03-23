// 目标 写入一个页面
// 使用http打开一个端口服务
// 当地址是首页的时候读取首页文件，展示首页
// 当地址是用户地址的时候，在页面用一个接口写入用户信息
// 界面不存在的时候 返回一个404


// 使用stream流来引入一个图片
// stream有一个入口fs.createReadStream 一个出口fs.createWriteStream 中间用管道pipe连接

const http = require('http');
const fs = require('fs');
const path = require('path');

const serve = http.createServer((request, response) => {
    console.log('open a service');

    const { url, method, headers } = request;
    console.log(url, method);
    console.log(`cookie: ${headers.cookie}`)
    if (method === 'GET' && url === '/') {
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
    } else if (method === 'GET' && url === '/api/user') {
        // 跨域的第一道门 cros 或 jsonp 代理服务器等方式允许跨域 这里设置cros的跨域头Access-Control-Allow-Origin 允许指定端口访问
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000')
        // 允许设置cookie
        response.setHeader('Access-Control-Allow-Credentials', 'true');
        // 跨域的第三道门 设置cookie
        // 传入cookie 模拟设置
        response.setHeader('Set-Cookie', 'cookie1=val222;')
        

        response.writeHead(200, { 'Content-type': 'application/json' })
        response.end(JSON.stringify({name: 'tom', age: 18}))
    } else if (method === 'OPTIONS' && url === '/api/user') {
        // 跨域的第二道门 复杂请求的处理 复杂请求服务器会自动发送预检请求 options 处理options 允许api/user接口通过
        response.writeHead(200, {
            'Access-Control-Allow-Origin': 'http://localhost:9000', // 允许指定端口访问
            'Access-Control-Allow-Headers': 'X-Token,Content-Type', // 添加访问头 X-Token 为设置的 Content-Type处理传参
            'Access-Control-Allow-Methods': 'PUT', // 请求方式
            'Access-Control-Allow-Credentials': 'true' // 允许设置cookie
        })
        response.end();
    } else if (method === 'GET' && url === '/form') {
        fs.readFile('./save.html', (error, data) => {
            if (error) {
                response.writeHead(500, { 'Content-type': 'text/plain;charset=utf-8' })
                response.end('服务器内部错误')
                return
            }

            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            response.end(data);
        });
    } else if (method === 'POST' && url === '/api/save') {
        // 模拟Bodyparser 用流的方式传输数据
        // 用一个变量存放传输流的数组
        let reqData = [];
        // 用一个变量表示现在传输的流的大小
        let size = 0;

        // 监听data事件 用来观测接收传入的数据流 保存在数组中
        request.on('data', data => {
            console.log(`>>>request ${data}`);
            reqData.push(data);
            size += data.length;
        });

        // 监听end事件 用来观测传输结束 使用Buffer凭借二进制流数据 返回
        request.on('end', () => {
            console.log('resquest end');

            const data = Buffer.concat(reqData, size);
            console.log(`data ---- ${data}`);
            response.end(`formData: ${data}`);
        })
    } else if (method === 'GET' && url === '/upload') {
        fs.readFile('./upload.html', (error, data) => {
            if (error) {
                response.writeHead(500, { 'Content-type': 'text/plain;charset=utf-8' })
                response.end('服务器内部错误')
                return
            }

            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html');
            response.end(data);
        });
    } else if (method === 'POST' && url === '/api/upload') {
        console.log('upload...');
        // 使用流上传文件

        // 获取上传的文件名
        const fileName = request.headers['file-name'] || 'abc.png';
        // 拼接上传文件输出的地址
        const outputFile = path.resolve(__dirname + '/files', fileName);
        // 将流转化为文件输出
        const fsi = fs.createWriteStream(outputFile);

        // 转化文件流并输出
        
        // 虽然写法简便无法consle 以及对内部做出改动
        // request.pipe(fsi);
        // response.end();

        // Buffer connect 用刚才Bodyparser传输流的方式
        // 可以很快的传输文件 并且在内部可以做出修改 但是遇到大文件会造成阻塞 影响进程
        // let clientList = [];
        // let size = 0;
        // request.on('data', data => {
        //     console.log(`>>>resquest ${data}`);
        //     clientList.push(data);
        //     size += data.length;
        //     console.log('data:',data ,size)
        // })

        // request.on('end', () => {
        //     console.log('<<<resquest end');

        //     const buffer = Buffer.concat(clientList, size);
        //     size = 0;
        //     fs.writeFileSync(outputFile, buffer)
        //     response.end();
        // })

        // 流事件写入
        // 直接利用转化后的流 来写入和结束 这样不仅可以在内部作出修改 遇到大文件时候也会异步执行 不会影响主线程
        request.on('data', data => {
            console.log(`>>>resquest ${data}`);
            fsi.write(data)
        })

        request.on('end', () => {
            console.log('<<<resquest end');
            fsi.end();
            response.end();
        })
    } else {
        // 界面不存在返回404
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain;charset=utf-8');
        response.end('服务器内部错误')
    }
})

serve.listen(8000);