'use strict';

const BaseController = require('./base');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

// 用户密码加密盐值
const HashSalt = 'user::salt#@123!';

class UserController extends BaseController {
  async register() {
    const { success, error, ctx } = this;
    // 获取请求信息
    const { email, passwd, nickname, captcha } = ctx.request.body;

    // 判断验证码是否正确
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return error(ctx, -1, '验证码错误');
    }

    // 验证邮箱是否存在
    if (await this.vildateEmail(email)) {
      return error(ctx, -1, '邮箱已存在');
    }

    // 创建用户
    const ret = await ctx.model.User.create({
      email,
      passwd: md5(passwd + HashSalt),
      nickname,
    });

    if (ret && ret._id) {
      success(ctx, {
        name: '注册成功，请登录',
      });
    }
  }

  async vildateNickname() {
    const nickname = '';
    const ret = await this.ctx.model.User.findOne({ nickname });
    return ret;
  }

  async vildateEmail(email) {
    const ret = await this.ctx.model.User.findOne({ email });
    return ret;
  }

  async login() {
    const { success, error, ctx, app } = this;
    const { email, passwd } = ctx.request.body;

    // 查询用户是否存在
    const ret = await this.ctx.model.User.findOne({
      email,
      passwd: md5(passwd + HashSalt),
    });

    if (!ret) {
      return error(ctx, -1, '邮箱/密码错误');
    }
    const { nickname } = ret;
    // 生成用户token
    const token = jwt.sign(
      {
        email,
        passwd,
      },
      app.config.jwt.secret,
      { expiresIn: '1h' }
    );

    // 用户存在 返回信息
    success(ctx, {
      message: '登陆成功',
      userInfo: {
        email,
        nickname,
        token,
        _id: ret._id,
      },
    });
  }
}

module.exports = UserController;
