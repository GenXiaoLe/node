 
module.exports = (app) => ({
    index: async ctx => {
        app.ctx.body = '首页页面'
    },
    detail: async ctx => {
        app.ctx.body = '详情页面'
    }
})