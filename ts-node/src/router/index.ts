// 创建一个获取用户和添加用户的路由
// 自定义一个装饰器 用来自动生成注册路由
import * as Koa from 'koa';

import { get, post } from '../utils/index';

// 先使用模拟数据
const user = [{name: 'tom', age: 18}, {name: 'jerry', age: 18}]

export default class User {

    @get('/user')
    public list(ctx) {
        ctx.body = { ok: 1, data: user }
    }

    @post('/user')
    public add(ctx) {
        user.push(ctx.request.body);
        ctx.body = { ok: 1, message: 'success' }
    }
}
