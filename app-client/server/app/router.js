'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/home', controller.home.index);

  router.get('/captcha', controller.utils.captcha);

  router.group({
    name: 'user::',
    prefix: '/user',
  },
  router => {
    router.post('/register', controller.user.post);
    router.post('/login', controller.user.post);
    router.get('/info');
  });
};
