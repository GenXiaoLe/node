'use strict';

const Service = require('egg').Service;

class Products extends Service {
  async getAll() {
    return await this.ctx.model.Product.findAll();
  }
}

module.exports = Products;
