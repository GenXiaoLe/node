'use strict';

const BaseController = require('./base');
const md5 = require('md5');

const HashSalt = 'user::salt';

class UserController extends BaseController {
  async register() {
    const { success, error, ctx } = this;
    const { email, passwd, nickname, captcha } = ctx.request.body;

    if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
      if (!this.vildateEmail(email)) {
        error(ctx, -1, '邮箱已存在');
      } else {
        const ret = await ctx.model.User.create({
          email,
          passwd: md5(passwd + HashSalt),
          nickname,
        });
        console.log('ret', ret);

        if (ret._id) {
          success(ctx, {
            name: '注册成功，请登录',
          });
        }
      }
    } else {
      error(ctx, -1, '验证码错误');
    }
  }

  async vildateEmail(email) {
    return this.ctx.model.User.findOne({ email });
  }

  async login() {
    const { success } = this;

    success({});
  }
}

module.exports = UserController;
