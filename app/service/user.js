'use strict';

const Service = require('egg').Service;
// const fs = require('fs');
// const path = require('path');
const crypto = require('crypto');
const moment = require('moment');
const _ = require('lodash');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserService extends Service {
  // async login() {
  //
  //   const { ctx, app } = this;
  //   // post请求传来的参数
  //   const { username, password } = ctx.request.body;
  //   console.log(username, password);
  //
  //   const res = await ctx.model.Users.findAll({
  //     where: {
  //       name: username,
  //       password: this.getMd5Data(password),
  //     },
  //   });
  //
  //   // 检查调用是否成功，如果调用失败会抛出异常
  //   // this.checkSuccess(res);
  //   console.log(res);
  //
  //
  //   let message = '';
  //   let data = null;
  //
  //   if (res.length == 0) {
  //     message = '登陆失败';
  //   } else {
  //     // 挂载鉴权路由
  //     app.passport.mount('user');
  //     message = '登陆成功';
  //     data = {
  //       user_id: res[0].user_id,
  //       name: res[0].name,
  //       // mailbox: '',
  //       real_name: res[0].real_name,
  //       user_role: this.getRoleName(res[0].user_role),
  //       login_time: moment(parseInt(res[0].login_time)).format('YYYY-MM-DD hh:mm:ss'),
  //       // token_expire_time: '',
  //       // update_time: '',
  //       // create_time: '',
  //       token: this.getToken(res[0].name),
  //     };
  //   }
  //
  //   return {
  //     code: 200,
  //     message,
  //     data,
  //   };
  //
  //   // if (username) {
  //   //   // 用户存在,生成token
  //   //   const token = app.jwt.sign({
  //   //     name: user.name,
  //   //   }, app.config.jwt.secret);
  //   //
  //   //   ctx.body = {
  //   //     code: 200,
  //   //     message: '登录成功',
  //   //     data: { id: user.id },
  //   //     token,
  //   //   };
  //   // }
  // }

  // 查询user表，验证密码和花名
  async validUser(username, password) {
    const data = await this.getUser();
    const pwd = crypto.createHash('md5').update(password).digest('hex');
    for (const item of data) {
      if (item.name === username && item.password === pwd) return true;
    }
    return false;
  }

  // 查询test数据库user表，验证是否存在该用户
  async isValidUser(key, value) {
    const data = await this.getUser();
    for (const item of data) {
      if (item[key] === value) return true;
    }
    return false;
  }
  // 获取用户，不传id则查询所有
  async getUser(id) {
    // const _this = this;
    const { ctx } = this;
    if (id) {
      // noinspection JSAnnotator
      const res = _.cloneDeep(await ctx.model.Users.findByPk(id));
      res.user_role = this.getRoleName(res.user_role);
      res.login_time = moment(parseInt(res.login_time)).format('YYYY-MM-DD hh:mm:ss');
      return res;
    }
    return await ctx.model.Users.findAll();
  }

  // 专门对数据进行md5加密的方法，输入明文返回密文
  getMd5Data(password) {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  // 获取token
  getToken(username) {
    const { app } = this;
    return app.jwt.sign({
      username,
    }, app.config.jwt.secret);
  }

  // 获取角色名字
  getRoleName(val) {
    let res = '';
    switch (val) {
      case 1:
        res = '管理员';
        break;
      case 2:
        res = '普通用户';
        break;
    }
    return res;
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      // 远程调用返回格式错误
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }

  // 新增人员
  async addUser(username,password) {
    const { ctx } = this;
    const psw = this.getMd5Data(password);
    const user_id = ctx.helper.uuid.replace(/-/g,"");
    console.log(user_id,username,psw);
    await ctx.model.Users.create({
      user_id,
      name:username,
      password:psw
    });
  }

}

module.exports = UserService;
