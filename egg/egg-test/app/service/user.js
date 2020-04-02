'use strict';

const Service = require('egg').Service;

class User extends Service {
  async getAll() {
    // return [
    //   {
    //     name: 'jerry',
    //     age: 18,
    //   },
    //   {
    //     name: 'tom',
    //     age: 18,
    //   },
    // ];

    // 获取model模型数据库里的数据
    return await this.ctx.model.User.findAll();
  }
}

module.exports = User;
