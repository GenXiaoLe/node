'use strict';

const Controller = require('egg').Controller;

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
