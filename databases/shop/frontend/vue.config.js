module.exports = {
    devServer: {
      proxy: {
        "/api": {
          //代理api
          target: "http://localhost:9090/", //服务器api地址
          changeOrigin: true, //是否跨域
          ws: true, // proxy websockets
          pathRewrite: {
            //重写路径
            "^/api": ""
          }
        }
      }
    }
};