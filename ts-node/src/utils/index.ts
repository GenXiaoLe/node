 
// 装饰器器的编写，以@get('/users')为例，它是函数装饰器器且有配置项，其函数签 名为: function get(path) { return function(target, property, descriptor) {} }

import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

// 设置接口类型
type HTTPTYPE = 'get' | 'post' | 'put' | 'delete';

type LoadOptions = {
    /**
    * 路路由⽂文件扩展名，默认值是`.{js,ts}` 
    **/
    extname?: string;
};

// 设置路由的配置类型
type RouterOption = {
    /**
    * 适⽤用于某个请求⽐比较特殊，需要单独制定前缀的情形
    */
   prefix?: string,
    
    /**
    * 给当前路路由添加⼀一个或多个中间件
    */
   middlewares: Array<Koa.Middleware>
}

// 写一个注册路由的方法
const router = new KoaRouter();

// 这么做有一个缺点 就是太依赖上下文 比如router都是外部引用 不够通用 需要改写一下
// const method = method => (path: string, options?: RouterOption) => {
//     // 装饰器默认传入的参数
//     return (target, property) => {
//         const url = options.prefix ? options.prefix + path : path;

//         router[method](url, target[property]);
//     }
// }

const decorate = (method: HTTPTYPE, path: string, router: KoaRouter, options?: RouterOption) => {
    return (target, property) => {
        const url = options.prefix ? options.prefix + path : path;
        router[method](url, target[property]);
    }
}

const method = method => (path: string, options?: RouterOption) => decorate(method, path, router, options)

export const get = method('get');
export const post = method('post');

// 读取router目录的文件并注入装饰器
// 接收目录名和load配置
export const load = (floder: string, options?: LoadOptions): KoaRouter => {
    // 定义扩展名
    const extname = options && options.extname ? options.extname : '{.js, ts}';
    // 使用glob同步获取文件夹 遍历注入装饰器
    glob.sync(require('path').join(floder, `./**/*${extname}`))
        .forEach(item => require(item))
    // 返回router实例
    return router;
}
