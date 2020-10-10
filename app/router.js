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

  // 获取全部用户数据 不做鉴权
  router.get('/user', controller.user.index);

  // 获取单独某一条用户数据，加权鉴
  router.get('/user/:id', jwt, controller.user.show);

  // 新增
  router.put('/user', controller.user.create);

  // 模拟返回xml格式数据
  router.get('/xml', controller.xml.index);
};
