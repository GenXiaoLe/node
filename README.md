### node
> 关于node 练习与学习的具体内容

#### node测试用例
- 加载文件
- 起一个简单的服务 加载页面
- stream fs http的基础应用


#### 简单的npm包或者cli

##### 用到的包和库
- figlet 这个命令将普通终端文本转换为大字母
- download-git-repo 将GitHub GitLab 等 代码下载到某个文件夹里
- open 打开像url 文件等地址 可跨平台
- handlebars 一种可扩展的模板编译器或者模板语言
- ora 实现node.js 命令行环境的 loading效果， 和显示各种状态的图标等
- chalk 用来优雅地输出带颜色的文本
- clear 清除终端屏幕
- commander 命令行参数处理框架 可在我们自定义npm包的时候提供命令行


ps: 关于commander指令内容具体参考 https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md


##### 构建一个自定义的包
- 创建一个文件夹
- 在文件夹下 npm init -y 构建package.json
- 在package.json文件中写入bin命令 将包的命令行文件导入
- 构建一个包含命令行的包 头部写入#!/usr/bin/env node 标明当前node运行环境
- 将npm 模块链接到对应的运⾏行行项⽬目中去 使用 npm link 部署到全局 可在文件中写一个log 直接运行该指令 验证是否成功
- 创建lib文件夹里面放置包的配置文件
- 首先写一个init 里面包含美化安装创建文本 调用方法下载代码 安装依赖等内容
- 再写一个download 用来下载代码以及放置在相关文件夹
- 代码下载完成后 在init 中创建一个spawn方法 用来安装依赖
- 安装完依赖使用open打开浏览器页面 以及spawn运行 run 启动服务器


##### 使用handlebars构建自定义更新router
- 创建路由模板以及index模板 hbs文件
- 创建读写路由表文件 refresh.js
- 获取列表
- 写一个编译函数
- 编译菜单和路由
- 在bin的cli文件中配置refresh文件
- 运行生成路由
- 写一个sh文件 发布到npm上


##### http同源策略
> 协议 url 端口 任意不同 则看作不同源


