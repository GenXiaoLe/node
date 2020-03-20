// 目标 实现request请求router
// 包含get post 方法 （目前仅实现这两种） 接收两个参数 url 和 callback
// 包含routes 方法 执行返回一个函数 这个函数是和当前地址匹配到的 之前get或者post接收到的callback
// 创建一个类 router
// 声明一个属性 stack 存放 get和post的数据
// 写一个get post 方法 存放数据
// 写一个routers 执行时候返回callback


const KRouter = class Router {
    constructor() {
        this.stack = [];
    }

    // 因为post get方法操作很类似 统一写成一个函数 用来处理get post传过来的值
    register(path, method, callback) {
        // 构建一个策略表 用来存放router属性
        let router = { path, method, callback };
        this.stack.push(router);
    }

    get(path, callback) {
        this.register(path, 'get', callback);
    }

    post(path, callback) {
        this.register(path, 'post', callback);
    }

    routers() {
        // koa.use 传递两个参数ctx, next 在这里接收
        return async function(ctx, next) {
            let _stock = this.stack;
            let router;
            // 循环找出匹配到的路由
            // 如果地址和请求方式均相同 则代表匹配到 取出其中的callback
            // router = this.stack.find(item => item.path === ctx.url && item.method.indexOf(ctx.method) > -1).callback;
            for (let i = 0; i < _stock.length; i++) {
                let item = _stock[i];
                
                if (item.path === ctx.url && item.method.indexOf(ctx.method) > -1) {
                    router = item.callback;
                    break;
                }
            }

            // 如果是函数则执行找到的回调函数 否则直接进行下一步
            if (typeof router === 'function') {
                router(ctx, next);
                return;
            }

            await next();
        }.bind(this)
    }
}

module.exports = KRouter;