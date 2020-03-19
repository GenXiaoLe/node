#!/usr/bin/env node

// 引入commander 编写命令行
const program = require('commander');
// 获取到当前包的版本
program.version(require('../package').version);

program
    .command('refresh') // 定义指令名称
    .description('refresh routers...') // 添加包的描述
    .action(require('../lib/refresh'))// 运行包时候执行的动作

program
    .command('init <name>') // 定义指令名称
    .description('init cli project') // 添加包的描述
    .action(require('../lib/init'))// 运行包时候执行的动作

// 设置选项并在定义时调用命令。
program.parse(process.argv);