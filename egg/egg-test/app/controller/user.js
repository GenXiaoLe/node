'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;

    // ctx.body = {
    //   name: 'tom',
    //   age: 18,
    // };

    // 获取service请求到的数据
    ctx.body = await ctx.service.user.getAll();
  }
}

module.exports = UserController;
