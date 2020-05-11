'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/home', controller.home.index);

  router.get('/captcha', controller.utils.captcha);

  router.group({
    name: 'user',
    prefix: '/user',
  },
  router => {
    const { register } = controller.user;
    router.post('/register', register);
    // router.post('/login', login);
    // router.get('/info', info);
  });
};
