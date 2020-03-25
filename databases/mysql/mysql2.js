// 使用mysql2进行操作数据库
// 支持异步操作
(
    async () => {
        const mysql = require('mysql2/promise');

        // 创建连接对象
        const config = {
            host: 'localhost',
            user: 'root',
            password: '418356233',
            database: 'mysql_test'
        }

        const sql = await mysql.createConnection(config);

        const CREATE_SQL = `
            CREATE TABLE IF NOT EXISTS test2(
                id INT NOT NULL AUTO_INCREMENT,
                message VARCHAR(45) NULL,
                PRIMARY KEY (id)
            )
        `

        // 插入语句 这里的?表示占位符
        const INSERT_SQL = `INSERT INTO test2(message) VALUES(?)`
        // 查询语句
        const SELECT_SQL = `SELECT * FROM test2`

        // 执行数据库语句 创建表
        let res = await sql.execute(CREATE_SQL);

        console.log(`create ${res.toString()}`);

        res = await sql.execute(INSERT_SQL, ['abc']);

        console.log(`insert ${res.toString()}`);

        // 查询结构出行和字段
        const [rows, fields] = await sql.execute(SELECT_SQL);

        console.log(`select ${rows.toString()}`);

    }
)()