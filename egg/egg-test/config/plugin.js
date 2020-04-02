'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 约定语法 sequelize名称 可以看jquery引入时候替换为$
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};
