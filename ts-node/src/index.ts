// console.log('hello ndoe & ts');

import * as Koa from 'koa';
import * as bodify from 'koa-body';
import * as serve from 'koa-static';
import * as timing from 'koa-xtime';

import { load } from './utils/index';
import { resolve } from 'path';

const app = new Koa();

// 定位根目录
app.use(serve(__dirname + '/'));

app.use(timing());

app.use(
    bodify({
        multipart: true, // 使⽤⾮严格模式，解析 delete 请求的请求体 strict: false,
    })
);

app.use((ctx: Koa.Context) => {
    ctx.body = 'Hello ts'
})

const router = load(resolve(__dirname, './routers'));
app.use(router.routes());

app.listen('8080', () => console.log('listen prot 8080'))