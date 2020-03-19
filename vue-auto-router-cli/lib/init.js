const { promisify } = require('util');
const clear = require('clear');
const figlet = promisify(require('figlet'));
// 使用chalk封装一下log 使其打印彩色文字
const chalk = require('chalk');
const log = result => console.log(chalk.green(result));
const open = require('open');

const { clone } = require('./download');


// 写一个init方法 接收方法名name
module.exports = async name => {
    // 美化界面
    // 先清空控制台
    clear();

    // 将文字转为艺术体
    const data = await figlet('welcomde router-cli')
    log(data);

    // 开始下载文件
    log(`🏀 sing jump rap to download: ${name}`)
    // 调用方法 将文件下载到指定目录 github:前缀为从github上下载固定写法
    await clone('github:su37josephxia/vue-template', name)
    log(`🚀安装依赖中: ${name}`)


    // 下载完成后安装依赖 第二个参数为数组 可把多个指令放入 第三个参数cwd固定写法 表示指定目录
    await spawn('npm', ['install'], { cwd: `./${name}` })

    // 打印日志
    log(
        `   
            👌 所有依赖下载ok
            ================
                cd ${name}
                npm run serve
            ================
        `
    )

    // 启动项目
    // 使用open打开界面启动项目
    open('http://localhost:8080')

    await spawn('npm', ['run', 'serve'], {cwd: `./${name}`})

}


// 创建一个内部使用的方法spawn 开通一个子进程 安装相关依赖 之后再合并到主进程
const spawn = async (...args) => {
    // 使用child_process库的spawn方法
    const { spawn } = require('child_process');

    // 返回一个promise
    return new Promise(resolve => {
        // 开辟子进程 接收一个数组 将参数传入 第一个包管理工具名 npm cnpm等 第二个 执行指令 install run 等 第三个 执行的目录
        const proc = spawn(...args);

        // 将结果并入主进程 主进程为process 使用pipe连接
        proc.stdout.pipe(process.stdout);
        // 将错误信息并入主线程
        proc.stderr.pipe(process.stderr);
        // 执行完后关闭子进程
        proc.on('close', () => {
            resolve();
        })
    })
}