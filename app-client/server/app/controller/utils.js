'use strict';

const BaseController = require('./base');
const svgCaptcah = require('svg-captcha');

class UtilsController extends BaseController {
  async captcha() {
    const { ctx } = this;
    // 使用svgCaptcah创建验证码
    const captcha = svgCaptcah.create({
      size: 4, // 字符长度是4
      ignoreChars: '0o1i', // 过滤掉0o1i这些字符
      noise: 3, // 数字显示占几行
      width: 100,
      height: 40,
      fontSize: 50,
    });

    // 将验证码存入session中 方便之后对比
    ctx.session.captcha = captcha.text;
    // 定义图片格式
    ctx.response.type = 'image/svg+xml';

    console.log('captcha => ' + captcha.text);

    ctx.body = captcha.data;
  }

  async emailCaptcha() {
    const { ctx } = this;
    // 构建email验证码
    const emailCaptcha = Math.random().toString().slice(4, 8);
    console.log(`emailCaptcha => ${emailCaptcha}`);

    // 存入session方便后续对比
    ctx.session.emailCaptcha = emailCaptcha;
    // 调用业务层service的方法发送邮件
    const ret = await this.service.tools.sendEmail(ctx.query.email, 'cc社区');

    if (ret) {
      this.success(ctx, { message: '邮件验证码发送成功，请至邮箱中查看' });
    } else {
      this.error(ctx, -1, '发送失败');
    }
  }
}

module.exports = UtilsController;