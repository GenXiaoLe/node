'use strict';

const jwt = require('jsonwebtoken');

// 因为需要用到app 但是中间件并没有提供这个对象 所以使用柯里化包装一下 接收app
module.exports = ({ app }) => {
  // 中间件接收一个ctx next
  return (ctx, next) => {
    const tokenHeader = ctx.request.headers.authorization;

    if (!tokenHeader) {
      ctx.body = {
        code: -666,
        message: '用户没有登录',
      };
      return;
    }

    // 中间件取出token
    const token = tokenHeader.slice(7);

    try {
      // 解析token
      const decoded = jwt.verify(token, app.config.jwt.secret);

      // 保存数据
      ctx.state.email = decoded.email;
      ctx.state.nickname = decoded.nickname;
      ctx.state._id = decoded._id;

      next();
    } catch (error) {
      console.log(error);
      if (error.name === 'TokenExpiredError') {
        ctx.body = {
          code: -666,
          message: '用户登录过期，请重新登录',
        };
      }
    }
  };
};
