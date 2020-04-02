 
// 接收 core的实例app 并从里面拿到controller里的内容

module.exports = {
    'get /': async (app) => {
        const name = await app.$service.user.getName();
        app.ctx.body = `用户名: ${name}`
    },
    'get /detail': (app) => {
        app.ctx.body = app.$service.user.getAge();
    }
}