'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/home', controller.home.index);

  // 获取验证码
  router.get('/captcha', controller.utils.captcha);

  // 获取邮箱验证码
  router.get('/emailCaptcha', controller.utils.emailCaptcha);

  router.group({
    name: 'user',
    prefix: '/user',
  },
  router => {
    const { register, login } = controller.user;
    router.post('/register', register);
    router.post('/login', login);
    // router.get('/info', info);
  });
};
