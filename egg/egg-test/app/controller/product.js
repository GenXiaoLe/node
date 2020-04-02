'use strict';

const Controller = require('egg').Controller;

class Product extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = await ctx.service.product.getAll();
  }
}

module.exports = Product;
