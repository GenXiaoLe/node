// 封装一个类 集成所有初始化文件夹内容 并挂载 启动服务器

const Koa = require('koa');

const { initRouter, initController, initService } = require('./loader');

class Core {
    constructor() {
        // 注册集成所有事件
        this.$app = new Koa();
        this.$controller = initController(this);
        this.$service = initService();
        this.$router = initRouter(this);
        this.$app.use(this.$router.routes());
    }

    // 启动接口
    start(prot) {
        this.$app.listen(prot, () => console.log(`listen prot ${prot}`))
    }
}

module.exports = Core;