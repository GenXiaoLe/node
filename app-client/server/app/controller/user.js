'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  async register() {
    const { success } = this;

    success({});
  }

  async login() {
    const { success } = this;

    success({});
  }
}

module.exports = UserController;
