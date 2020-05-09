'use strict';

const Controller = require('egg').Controller;

const svgCaptcah = require('svg-captcha');

class UtilsController extends Controller {
  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcah.create({
      size: 4, // 字符长度是4
      ignoreChars: '0o1i', // 过滤掉0o1i这些字符
      noise: 3, // 数字显示占几行
      width: 100,
      height: 40,
      fontSize: 50,
    });

    ctx.session.captcha = captcha.text;
    ctx.response.type = 'image/svg+xml';

    console.log('captcha =>' + captcha.text);

    ctx.body = captcha.data;
  }
}

module.exports = UtilsController;
