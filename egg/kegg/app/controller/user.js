 
module.exports = app => ({
    index: async ctx => {
        ctx.body = '用户⾸页'
    },
    detail: async ctx => {
        ctx.body = '用户其他⻚面'
    }
})