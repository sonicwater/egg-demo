const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  // app.once('server', server => {
  //   // websocket
  //   console.log('server');
  // });
  // app.on('error', (err, ctx) => {
  //   // report error
  //   console.log('error');
  // });
  // app.on('request', ctx => {
  //   // log receive request
  //   console.log('request');
  // });
  // app.on('response', ctx => {
  //   // ctx.starttime is set by framework
  //   const used = Date.now() - ctx.starttime;
  //   // log total cost
  //   console.log('response');
  // });

  // 挂载 strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    debug('%s %s get user: %j', req.method, req.url, user);
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, user) => {});
  app.passport.serializeUser(async (ctx, user) => {});
  app.passport.deserializeUser(async (ctx, user) => {});
};
