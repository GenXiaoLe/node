// zhuaBa => 爪巴 简单的爬虫实现 give me pa
// https://www.dy2018.com
// 服务端模拟客户端发送请求到⽬目标服务器器获取⻚页⾯面内容并解析，获取其中关注部分的数据。

// 这里请求使用request库
const originRequest = require('request');
// 为服务器特别定制的，快速、灵活、实施的jQuery核心实现
const cheerio = require('cheerio');
// iconv-lite用于在node当中处理在各种操作系统出现的各种奇特编码，该模块不提供读写文件的操作，只提供文件编码转换的功能
const iconv = require('iconv-lite');

// 封装一个发送请求的函数 接收url 和 请求成功后的回调函数
function resquest(url, cb) {
    let options = {
        url,
        encoding: null
    }

    originRequest(url, options, cb);
}

// 开始爬 这个网站的爬虫 本质就是循环的请求 找出网址返回数据中自己想要知道的相关信息 然后把它们组合起来
for (let i = 100533; i < 100563; i++) {
    const _url = `https://www.dy2018.com/i/${i}.html`;

    resquest(_url, (err, resquest, body) => {
        // 返回参数有三个 错误信息 请求体 数据
        // 将返回的数据进行编码
        const html = iconv.decode(body, "gb2312");
        // 将编码过后的html编译 可进行节点查找
        const $ = cheerio.load(html);
        // 读出相关节点的信息内容
        console.log($(".title_all h1").text());
    })
}