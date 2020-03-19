// 读取需要生成的路由的文件列表 暂不考虑嵌套
// 写一个根据模板和文件列表的生成写入方法
// 写一个生成路由方法
// 写一个生成菜单方法

const fs = require('fs');
const handlebars = require('handlebars');
const chalk = require('chalk');

var path=require('path');

module.exports = async () => {
    // 获取列表
    const list = 
        // fs.readdirSync('./src/views')
        fs.readdirSync('./test/src/views')
        .filter(file => file !== 'Home.vue') // 过滤掉home文件因为基本不会改变
        .map(file => ({ // 返回一个对象 包含文件名和文件
            name: file.replace('.vue', '').toLowerCase(),
            file
        }));

    // 根据列表数据, 编译文件和模板编译生成路由
    complie(list, './test/src/router.js', './test/template/router.js.hbs');

    // 根据列表数据, 编译文件地址和模板编译生成菜单
    complie(list, './test/src/App.vue', './test/template/App.vue.hbs');
    
    /**
    * 编译模板⽂文件
    * @param meta 数据定义
    * @param filePath ⽬目标⽂文件路路径
    * @param templatePath 模板⽂文件路路径 */
    function complie(meta, filePath, templatePath) {
        // 先判断模板文件路径是否存在
        if (fs.existsSync(templatePath)) {
            // 读取模板内容 转化为字符串形式
            const content = fs.readFileSync(templatePath).toString();
            // 将模板字符串传入编译函数中 返回方法 在传入列表数据
            const result = handlebars.compile(content)(meta);
            // 将编译好的返回文件内容写入目标文件地址中
            fs.writeFileSync(filePath, result);
        }

        console.log(chalk.green(` ${filePath} 创建成功`))
    }
}