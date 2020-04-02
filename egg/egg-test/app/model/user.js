'use strict';

module.exports = app => {
  // 注册模型
  const { STRING } = app.Sequelize;
  const User = app.model.define(
    'users',
    { name: STRING(30) },
    { timestamps: false }
  );

  // 数据库同步
  User.sync();

  return User;
};
