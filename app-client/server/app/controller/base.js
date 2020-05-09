'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      data,
      code: 1,
    };
  }

  error(code, message, error = {}) {
    this.ctx.body = {
      code,
      message,
      error,
    };
  }
}

module.exports = BaseController;
