/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const path = require('path');

  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588842117486_9022';

  // add your middleware config here
  config.middleware = [];

  config.UPLOADURL = path.resolve(__dirname, '..', 'app/public');

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
    // 关闭所有接口的csrf检测
    security: {
      csrf: {
        enable: false,
      },
    },
    // 配置MongoDB连接
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1:27017/cshub',
        options: {},
      },
    },
    // 配置jwt秘钥
    jwt: {
      secret: 'user token',
    },
    // 配置上传图片
    multipart: {
      mode: 'file',
      whitelist: () => true,
    },
  };
};
