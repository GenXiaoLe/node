#### 全局安装egg
- npm i egg-init -g

#### 创建项目
- egg-init egg --type=simple

#### 启动项目
- npm run dev

#### 启动端口
- open localhost:7001


#### 三层模型
- controller控制器 service服务器 model模型 三个层级之间可以直接调用 解决了关联封装问题


#### model模型
- npm install --save egg-sequelize mysql2 安装插件
- config/plugin 引入插件
- config/config.default.js 编写配置


#### egg三层模型实现核心文件
- loader.js 加载路由 server model等文件夹下的文件 并将他们的内容初始化
- core.js 核心实例 构建一个类 将loader.js初始化的内容封装打包
- config.js 数据库集成 将插件以及连接数据库等操作整合



##### TODO: 缺少model层加载 以及 中间件 插件加载 连接数据库