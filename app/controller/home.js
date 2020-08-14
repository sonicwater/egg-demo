'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      title: ctx.helper.relativeTime([ 2016, 4, 29 ]),
    };
  }
}

module.exports = HomeController;
