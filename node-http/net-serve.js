// net 实现一个简单的socket
// 1. 引入net 并且创建server 供下面使用api
// 2. 监听connections事件，监测用户连入
// 3. 在收到客户端发来的消息之后作出处理
// 4. 客户端部分使用 telnet localhost xxxx 来访问

const net = require('net');
const chatServe = net.createServer();

const clientList = []; // 连入客户端列表

chatServe.on('connections', client => {
    // 连接进入写入欢迎语
    client.writr('Hi!\n');
    // 将每个用户保存
    clientList.push(client);

    // 客户端发来消息之后的操作
    client.on('data', data => {
        // 从clientList中取出每个客户端 然后遍历发送发言用户的消息
        clientList.forEach(_client => {
            _client.writr(data);
        })
    })
})

chatServe.listen(5000)
