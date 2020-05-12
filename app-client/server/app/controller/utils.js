'use strict';

const Controller = require('egg').Controller;

const svgCaptcah = require('svg-captcha');

class UtilsController extends Controller {
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
}

module.exports = UtilsController;
