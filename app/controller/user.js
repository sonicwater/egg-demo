'use strict';

const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const userLoginRule = {
  username: 'string',
  password: 'string',
};

class UserController extends Controller {
  // async login() {
  //   const { ctx, app } = this;
  //   const errs = app.validator.validate(userLoginRule, ctx.request.body);
  //
  //   if (errs) {
  //     ctx.status = 400;
  //     ctx.body = errs;
  //   } else {
  //     // 判断该用户是否存在
  //     const isValid = await ctx.service.user.isValidUser('name', ctx.request.body.username);
  //     if (isValid) {
  //       // const token = app.jwt.sign({
  //       //   username: ctx.request.body.username,
  //       // }, app.config.jwt.secret);
  //       // ctx.body = token;
  //       const res = await ctx.service.user.login();
  //       ctx.body = res;
  //       ctx.status = 200;
  //     } else {
  //       ctx.body = { code: 404, msg: '不存在该用户' };
  //     }
  //
  //   }
  //
  // }

  // async index() {
  //   const { ctx } = this;
  //   console.log(ctx.state.user);
  //   ctx.body = { code: 201, msg: '验证成功' };
  //
  // }

  // 登录
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    // 判断该用户是否存在并且密码是否正确
    const isValidUser = await ctx.service.user.validUser(username, password);
    if (isValidUser) {
      const token = app.jwt.sign({ username }, app.config.jwt.secret);
      ctx.body = { code: 200, msg: '登录成功', token };
    } else {
      ctx.body = { code: 400, msg: '登录失败' };
    }
  }

  // 获取所有用户
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUser();
  }
  // 通过id获取用户
  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUser(ctx.params.id);
  }

  // 创建人员
  async create() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    await ctx.service.user.addUser(username,password);
    ctx.body = { code: 200, msg: '新增成功' };
  }

}

module.exports = UserController;
