'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);
  router.post('/news', controller.news.list);
  router.post('/user/login', controller.user.login);
  // router.post('/user', jwt, controller.user.index);

  // 查询 不做鉴权
  router.get('/user', controller.user.index);
  router.get('/user/:id', jwt, controller.user.show);
};
