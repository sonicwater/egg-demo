# eggjs登陆功能
查看 [egg 文档][egg] 

[egg]: https://eggjs.org
## 启动
```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```
## 部署
```bash
$ npm start
$ npm stop
```

## 说明
### 执行sql语句创建user表
```
CREATE TABLE `user` (
  `user_id` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户ID(主键)',
  `name` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` char(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `real_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '真实姓名',
  `user_role` int(8) DEFAULT NULL COMMENT '用户权限',
  `headimg` varchar(32) DEFAULT NULL COMMENT '用户头像',
  `login_time` bigint(16) DEFAULT NULL COMMENT '上次登陆时间',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
#### 可用postman测试
- 先用put方式请求http://127.0.0.1:7001/user，创建一个用户，body传参username和password,创建一条用户记录
- 然后post方式请求http://127.0.0.1:7001/user/login，调用登陆接口，body传参username和password就是刚才创建的用户名和密码,登陆成功后返回json格式如下：
 ```javascript
 {
    "code": 200,
    "msg": "登录成功",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbmciLCJpYXQiOjE2MDIyOTkyNDd9.28iIiOfW8sZkbWtAyCAB0VtGeJZVT-YSFPqJAwlNsVY"
    }
}
 ```
 data中返回标准格式的token
 - 用get方式请求http://127.0.0.1:7001/user接口，获取全部用户表数据。此接口没加权鉴。
 - 用get方式请求http://127.0.0.1:7001/user/:id，获取某一条用户数据，此接口加了权鉴，Headers部分要传Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbmciLCJpYXQiOjE2MDIyOTkyNDd9.28iIiOfW8sZkbWtAyCAB0VtGeJZVT-YSFPqJAwlNsVY
 Bearer后面加一个空格再加之前登陆成功后返回的token，路由中的:id部分传的是用户表中此用户的user_id字段。

### 关于如何加权鉴
路由 /app/router.js 
```javascript
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  ...
  
  // 获取全部用户数据 不做鉴权
  router.get('/user', controller.user.index);

  // 获取单独某一条用户数据，加权鉴
  router.get('/user/:id', jwt, controller.user.show);
  ...
};
```
const { router, controller, jwt } = app; 定义jwt，在路由的参数中，第二个参数是否传jwt，决定是否加权鉴。