// 目标
// 实现 listen监听 以及use调用执行
// 1.创建一个类KKoa2 并导出
// 2.写一个use方法
// 3.写一个listen方法
// 4. use 方法接收一个上下文ctx 包含body等一系列自定义属性 以及 resquest response中的一些属性等 接下来构建一个上下文
// 5. 构建resquest 以及 response 方法 这里使用的概念是利用get set拆分简化普通对象
// 6. 导入这三个类 并且 写一个创建上下文的方法
// 7. 在listen中构建上下文 并传入
// 8. 因为这样多使用几个use 会导致callback被覆盖 所以我们要使用中间件的概念进行函数复合
// 9. 写一个复合方法
// 10. 创建一个函数数组变量middlewares
// 11. 在use中把回调函数push进middlewares
// 12. 在listen中复合中间件函数
// 13. 在回调函数中可以接受上下文ctx 作为其他参数复合传入

const http = require('http');

const request = require('./ctx/request');
const response = require('./ctx/response');
const context = require('./ctx/context');

const middlewares = [];

class KKoa2 {
    // 接收一个回调函数 先存起来
    use(callback) {
        // this.callback = callback;
        middlewares.push(callback);
    }

    // 接收监听端口以及回调函数等listen的参数
    listen(...args) {
        // 调用callback 把参数传进去
        const serve = http.createServer(async (req, res) => {
            // console.log(req.method);
            const ctx = this.createContext(req, res);
            // this.callback(req, res);
            // this.callback(ctx);
            // 复合中间件函数
            const fn = compose(middlewares);

            // 传入上下文
            await fn(ctx);

            res.end(ctx.body);
        })

        serve.listen(...args);
    }

    // 构建上下文 把上面三个类关联起来
    createContext(req, res) {
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);

        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;

        return ctx;
    }
}

// 函数复合方法 可用reduce 参考vue中间件 这里使用更容易懂得原生写法
// 接收middlewares为要执行函数的数组
const compose = function(middlewares) {
    // 执行返回一个函数
    return function(ctx) {
        // dispatch为中间层函数 接受一个参数代表下标依次执行函数数组 从第0个函数开始执行 返回一个promise 供异步执行
        return dispatch(0)
        function dispatch(index) {
            let fn = middlewares[index];
            // 如果fn不存在则直接返回空的promise
            if (!fn) {
                return Promise.resolve();
            }
            return Promise.resolve(
                // 函数执行接受一个next函数 调用执行下一个函数 即使用时候的next
                fn(ctx, function next() {
                    // promise完成后 执行下一个
                    dispatch(index + 1)
                })
            );
        }

    }
}

module.exports = KKoa2