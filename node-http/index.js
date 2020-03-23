// 创建一个node 同期启用api.js 以及 proxy代理 以同时启动两个端口 测试跨域模拟

const api = require('./api');
const proxy = require('./proxy');