'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;

  const jwt = middleware.jwt({ app });

  router.get('/home', controller.home.index);

  // 上传图片
  router.post('/upload', controller.utils.upload);

  // 获取已经上传的文件
  router.post('/checkFile', controller.utils.checkFile);

  // 获取验证码
  router.get('/captcha', controller.utils.captcha);

  // 获取邮箱验证码
  router.get('/emailCaptcha', controller.utils.emailCaptcha);

  router.group({
    name: 'user',
    prefix: '/user',
  },
  router => {
    const { register, login, info } = controller.user;
    router.post('/register', register);
    router.post('/login', login);
    router.get('/info', jwt, info);
  });
};
