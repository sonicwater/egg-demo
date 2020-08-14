const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const { ctx, app } = this;
    console.log(ctx.user);
    const res = await this.ctx.service.news.list();
    this.ctx.body = res;
  }
}

module.exports = NewsController;
