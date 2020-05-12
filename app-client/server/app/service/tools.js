'use strict';

const Service = require('egg').Service;

const nodemailer = require('nodemailer');

// 发送邮件的邮箱
const sendEmail = 'genxiaole1993@126.com';
// 发送邮件的stemp
// 需自行保管 避免泄露
const sendPasswd = 'A******K';

// 创建配置项
const transporter = nodemailer.createTransport({
  service: '126', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
  port: 465, // SMTP 端口
  secureConnection: true, // 使用了 SSL
  auth: {
    user: sendEmail,
    pass: sendPasswd,
  },
});

class ToolsServide extends Service {
  async sendEmail(email = '', subject = '', text = '') {
    // 创建发送的内容
    const message = {
      from: sendEmail, // 发送的邮箱
      cc: sendEmail, // 抄送的邮箱
      to: email, // 目标邮箱
      subject, // 标题
      text, // 描述
      html: '<h2>欢迎加入cc社区，您的验证码是' + this.ctx.session.emailCaptcha + '</h2>', // 具体内容
    };

    try {
      // 发送邮件的方法
      await transporter.sendMail(message);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = ToolsServide;

