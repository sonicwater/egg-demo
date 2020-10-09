/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597197371919_1666';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.jwt = {
    secret: '123456',
  };

  config.security = {
    csrf: {
      enable: false,
      // ignoreJSON: true,
      // headerName: 'x-csrf-token', // 自定义请求头
    },
    // domainWhiteList: [ 'http://localhost:7002' ],
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
  };

  config.view = {
    mapping: {
      '.xml': 'ejs',
    },
  };

  // config.news = {
  //   pageSize: 5,
  //   serverUrl: 'https://hacker-news.firebaseio.com/v0',
  // };

  exports.validate = {
    // convert: false,
    // validateRoot: false,
  };

  exports.sequelize = {
    dialect: 'mysql',
    database: 'for_node',
    host: 'localhost',
    port: '3306',
    username: 'root', // 账号
    password: '123456', // 密码
  };

  return {
    ...config,
    ...userConfig,
  };
};
