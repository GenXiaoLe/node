'use strict';

const BaseController = require('./base');
const svgCaptcah = require('svg-captcha');
// const fse = require('fs-extra');
const fs = require('fs');
const path = require('path')

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

  async checkFile () {
    const { ctx, app } = this
    const { hash, ext } = ctx.request.body
    // 获取文件地址
    const filePath = path.resolve(app.config.UPLOADURL, `${hash}.${ext}`)

    let uploadList = []
    let uploaded = false
    //如果文件存在
    if (fs.existsSync(filePath)) {
      uploaded = true
    } else {
      const chunkPath = path.resolve(app.config.UPLOADURL, hash)
      uploadList = await this.getHashFileList(chunkPath)
    }

    this.success(ctx, { message: '获取列表', uploadList, uploaded });
  }

  async getHashFileList (path) {
    return fs.existsSync(path)
    ? await fs.readdirSync(path).filter(name => name[0] != '.')
    : []
  }

  async upload() {
    const { ctx, app } = this;
    const { filepath, filename } = ctx.request.files[0];
    // const uploadUrl = app.config.UPLOADURL + '/' + filename;
    const { name, fileHash } = ctx.request.body
    
    // 切片path
    const chunkPath = path.resolve(app.config.UPLOADURL, fileHash)

    // 如果没有文件夹 先创建文件夹
    if (!this._fsExistsSync(chunkPath)) {
      this._mkdirSync(chunkPath)
    }

    // 切片存储地址
    const uploadUrl = chunkPath + '/' + name;

    try {
      console.log(filepath, '-----', uploadUrl)
      // const ret = await fse.move(filepath, app.config.UPLOADURL + '/' + filename);
      fs.createReadStream(filepath).pipe(fs.createWriteStream(uploadUrl));
      this.success(ctx, { message: '上传成功', url: uploadUrl });
    } catch (error) {
      this.error(ctx, -1, '上传失败');
    }
  }

  // 创建文件夹
  _mkdirSync (path) {
    fs.mkdirSync(path)
  }

  //检测文件或者文件夹存在
  _fsExistsSync (path) {
    try {
      fs.accessSync(path)
      return true
    } catch (e) {
        return false
    }
  }
}

module.exports = UtilsController;
