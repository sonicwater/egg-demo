'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async list() {
    const { ctx } = this;
    const id = ctx.request.body.id;
    const data = [
      { id: 1, title: 'this is news 1', url: '/news/1' },
      { id: 2, title: 'this is news 2', url: '/news/2' },
      { id: 4, title: 'this is news 4', url: '/news/4' },
    ];
    let res = [];
    if (id) {
      data.forEach(item => {
        item.id == id && (res.push(item));
      });
    } else {
      res = data;
    }
    return res;
  }
}

module.exports = NewsService;
