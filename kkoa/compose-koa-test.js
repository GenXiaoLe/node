// 要点
// 1. 接收一个函数数组middlewares
// 2. 执行返回个函数可接受其他的参数 供下面使用
// 3. 返回一个中间函数dispatch 主要是为了依次执行函数 并可以明确执行情况 方便查找深度 返回promise 便于异步执行
// 4. 在里面调用当前的fn 并且在执行时候传入参数next函数 next再调用时候可以执行下一个fn
// ps: 其实整个执行过程像一个洋葱模型 从外到内 再到外

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
                // 函数执行接受一个next函数 调用执行下一个函数 即使用时候的next 接收传入的上下文ctx
                fn(ctx, function next() {
                    // promise完成后 执行下一个
                    dispatch(index + 1)
                })
            );
        }

    }
}

async function fn1(next) {
    console.log(1);
    await next();
    console.log(3);
}

async function fn2(next) {
    console.log(2);
    await delay();
    await next();
    console.log(6);
}

async function fn3(next) {
    console.log(4);
    await next();
    console.log(5);
}

function delay() {
    return new Promise((reslove) => {
            setTimeout(() => { 
                reslove();
            }, 2000); 
        }
    )
};

const middlewares = [fn1, fn2, fn3];
const fnCompose = compose(middlewares);
fnCompose(); // 123456