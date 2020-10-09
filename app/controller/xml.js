'use strict';

const Controller = require('egg').Controller;

class XmlController extends Controller {
  async index() {
    const { ctx } = this;
    // 使用模板引擎
    await ctx.render("index.xml",{lists:[{name:'Tom'},{name:'Jerry'}]});
  }
}

module.exports = XmlController;
