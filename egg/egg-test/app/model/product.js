'use strict';

module.exports = app => {
  const { STRING, DOUBLE } = app.Sequelize;
  const Product = app.model.define(
    'products', // 关联表名
    // 要取出的字段
    {
      title: STRING(30),
      price: DOUBLE,
      description: STRING(30),
    },
    { timestamps: false }
  );

  // 数据库同步
  Product.sync();

  return Product;
};
