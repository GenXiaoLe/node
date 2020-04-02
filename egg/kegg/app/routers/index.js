 
// 接收 core的实例app 并从里面拿到controller里的内容

module.exports = app => (
    {
        'get /': app.$controller.home.index,
        'get /detail': app.$controller.home.detail
    }
)