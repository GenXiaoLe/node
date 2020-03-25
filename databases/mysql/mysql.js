//mysql基本使用
const mysql = require('mysql');

// 做连接数据库的配置
const config = {
    host: 'localhost', // 主机地址
    user: 'root', // 用户名
    password: '418356233', // 密码
    database: 'mysql_test' // 数据库名称
}

// 创建连接对象
const sql = mysql.createConnection(config);

// 连接数据库
sql.connect(err => {
    if (err) {
        throw err;
    } else { 
        console.log("连接成功!");
    }
})

// 使用语法

// 创建表
const CREATE_SQL = `
    CREATE TABLE IF NOT EXISTS test(
        id INT NOT NULL AUTO_INCREMENT, 
        message VARCHAR(45) NULL, 
        PRIMARY KEY (id)
    )
`
// 插入语句 这里的?表示占位符
const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`
// 查询语句
const SELECT_SQL = `SELECT * FROM test`

// 执行数据库语句 创建表
sql.query(CREATE_SQL, (err) => {
    if (err) {
        throw err;
    }

    // 执行数据库语句 插入数据
    sql.query(INSERT_SQL, 'hello mysql', (error, result) => {
        if (error) {
            throw error;
        }

        console.log(result);
        sql.query(SELECT_SQL, (error2, result2) => {
            console.log(result2);
            sql.end(); // 若query语句句有嵌套，则end需在此执⾏行行
        })
    })
})