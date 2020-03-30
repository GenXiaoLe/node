// 实现分页查询

const express = require('express');
const app = express();
const path = require('path');

const mongodb = require('../models/db.js');

// 加载界面的时候 读取写入文件index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve('../index.html'));
})

// 获取列表
app.get('/api/getPage', async (req, res) => {
    // 拿到页数
    const { pageSize, keyword, category } = req.query;

    try {
        const col = mongodb.col('fruits');

        // 获取总条数
        const total = await col.find().count();

        // 构造筛选条件
        const condition = {};

        if (keyword) {
            condition.name = { $regex: new RegExp(keyword) }
        }

        if (category) {
            condition.category = category
        }

        // 获取每页数据
        // 这里使用toArray的原因是 这样拿出来的数据是游标 并不是真实的数组数据 需要转换
        const list = await col
            .find(condition)
            .skip((pageSize - 1) * 5)
            .limit(5)
            .toArray();

        // 返回数据
        res.json({
            ok: 1,
            data: {
                list,
                pagination: {
                    total,
                    pageSize
                }
            }
        })
    } catch(error) {
        console.log(error)
    }
})

// 获取分类
app.get('/api/getCategory', async (req, res) => {
    const col = mongodb.col('fruits');
    const data = await col.distinct('category')
    res.json({ok: 1, category: data})
})

app.listen('8000', () => console.log('listen prot: 8000'))

