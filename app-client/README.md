### ndoe项目实战

#### 技术栈 nuxt.js + egg.js + mongodb

#### 目录
- 前端代码 -> nuxt.js
- client/

    |- assets/
    
        |- image
        
        |- css
        
    |- components 公共组件
    
    |- layouts 公共模板文件
    
    |- pages 页面文件
    
    |- plugins 配置的插件库
    
    |- server SSR渲染相关
    
    |- static ico等静态文件
    
    |- store vuex代码
    
    |- test 测试文件


- 后端代码 -> egg.js
- server/

    |- app/
    
        |- controller 控制器 包括接口方法
        
        |- model 模型 保存数据库模型
        
        |- router.js 保存接口路由
        
    |- config 保存插件以及插件的配置
    
    |- test 测试文件

#### 目前已实现的功能
- 注册页面
    1. 获取验证码
    2. 验证码的校验以及邮箱的校验
    3. 用户的保存
- 登录页面
    1. 验证/查询 用户信息
    2. jwt生成token并保存
    3. 验证码的校验

