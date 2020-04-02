// 路由加载器
// 使用fs读取文件 并初始化

const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

// 封装方法读取指定目录下文件
// 接收两个参数 路径和回调函数 回调函数在读取文件成功后调用将文件名和文件内容传回去
function loader(dir, cb) {
    // 获取绝对路径
    const filePath = path.resolve(__dirname, dir);

    // 读取文件目录
    const files = fs.readdirSync(filePath);


    // 遍历解析文件
    files.forEach(fileName => {
        // 获取文件名
        fileName = fileName.replace('.js', '');

        // 导入文件
        const file = require(filePath + '/' + fileName);

        // 执行回调
        cb(fileName, file);
    })
}

// 初始化controller
function initController(app) {
    const _controllers = {};
    loader('app/controller', (fileName, controller) => {
        // controller
        // module.exports = {
        //     index: async ctx => {
        //         ctx.body = '首页页面'
        //     },
        //     detail: async ctx => {
        //         ctx.body = '详情页面'
        //     }
        // }

        _controllers[fileName] = controller(app);
    })

    return _controllers;
}

// 初始化service
function initService() {
    const _services = {};

    loader('app/service', (fileName, service) => {
        // service
        // module.exports = {
        //     getName() {
        //         return delay('tom', 1000)
        //     },
        //     getAge() {
        //         return 20
        //     }
        // }
        _services[fileName] = service;
    })
    return _services;
}

// 初始化路由
function initRouter(app) {
    // 使用koa-router
    const _Router = new Router();

    // 读取路由文件夹
    loader('app/routers', (fileName, routers) => {
        // 若是index⽆无前缀，别的⽂文件前缀就是⽂文件名
        const prefix = fileName === 'index' ? '' : `/${fileName}`;
        
        // 遍历路由并注册到koa-router中

        // 这是router中读到的内容
        // {
        //     'get /': async ctx => {
        //         ctx.body = '用户⾸页'
        //     },
        //     'get /detail': ctx => { 
        //         ctx.body = '用户其他⻚面'
        //     } 
        // }
        routers = typeof routers === 'function' ? routers(app) : routers;

        Object.keys(routers).forEach(router => {
            // 分割 get / 形式的key值
            const [method, path] = router.split(' ');

            console.log(`当前的文件地址是 ${method} ${prefix} ${path}`);

            // 注册路由
            // _Router[method](prefix + path, routers[router]);
            // 由于routers[router]可能是个异步函数 所以需要在包装一层
            _Router[method](prefix + path, async ctx => {
                // 传⼊入ctx
                // 挂载至app
                app.ctx = ctx;
                await routers[router](app)
            });

        })
    })

    return _Router;
}


module.exports = { initRouter, initController, initService }
