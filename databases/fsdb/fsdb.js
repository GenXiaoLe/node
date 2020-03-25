// 实现⼀一个⽂文件系统读写数据库

const fs = require('fs');

// 写一个读取文件的方法get 接收参数key
function get(key) {
    fs.readFile('./db.json', (err, data) => {
        const json = JSON.parse(data);
        console.log(json[key]);
    })
}

// 写一个写入文件的方法 接收value和key
function set(value, key) {
    fs.readFile('./db.json', (err, data) => {
        // 可能是空⽂文件，则设置为空对象
        const json = data ? JSON.parse(data) : {};
        // 设置值
        json[key] = value;

        // 将值写入到文件中
        fs.writeFile('./db.json', JSON.stringify(json), (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('写入成功');
            }
        })
    })
}

// 使用一个生成命令行的工具readline
// 生成命令行
const readline = require('readline');

// 调用createInterface方法 创建命令行 将当前进程的写入和输出流都配置好
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 监听命令行事件line 在命令行执行时候捕获到
rl.on('line', input => {
    // input => get xxx / set xxx xxx
    const [op, key, value] = input.split(' ');

    // 根据op类型进行对应操作
    if (op === 'get') {
        get(key);
    } else if (op === 'set') {
        set(value, key);
    } else if(op === 'quit'){ 
        rl.close();
    } else {
        console.log('没有该操作');
    }
})

// 写入关闭进程事件
rl.on('close', () => {
    console.log("程序结束");
    process.exit(0);
})