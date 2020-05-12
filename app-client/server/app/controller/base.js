'use strict';

const Controller = require('egg').Controller;

// 定制返回规格和规范
class BaseController extends Controller {
  success(ctx, data) {
    ctx.body = {
      code: 1,
      data,
    };
  }

  error(ctx, code, message, error = {}) {
    ctx.body = {
      code,
      message,
      error,
    };
  }
}

module.exports = BaseController;
