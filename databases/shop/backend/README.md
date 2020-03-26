### 创建商城的后台系统

#### 目录结构
| - models\
    | - user.js // 用户的表
    | - cartItem.js // cart和product多对多的中间表
    | - cart.js // 购物车的表
    | - product.js // 商品的表
    | - order-item.js // order和product多对多的中间表
    | - order.js // 订单的表
| - utils\
    | - config.js // 数据库信息的配置表
    | - database.js // 连接数据库的方法 返回sequelize实例
| - index.js // 数据库关联表关系和api

#### 具体实现步骤
- 使用的数据库工具 sequelize mysql2
- sequelize使用方法
    1. 实例化库 创建连接对象 并连接数据库
    2. 定义模型字段 创建表
    3. 同步数据库
    4. 操作数据库

- index.js步骤
    - 基础部分
        1. 初始化数据库以及数据库中的表
        2. 同步数据库 如果没有user创建一个 用于模拟权鉴
        3. 模拟权鉴登陆
    - 接口api部分
        1. 引入router
        2. 编写接口api
        3. 将router注入koa2中
    - 数据库关联部分
        1. 用户和商品一对多
        2. 用户和购物车一对一
        3. 购物车和商品多对多 用中间表实现关联
        4. 用户和订单多对多
        5. 订单和商品多对多 中间表实现关联

