# app-server

app-server

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


### 用到的插件

- egg-router-group
- egg-mongoose
- egg-validate
- md5
- jsonwebtoken

### 接口返回值规范

```

code: {
    code: 0,
    date: {},
    message: ''
}

// 1 代表成功 其他的是失败 -666代表token失效

```


[egg]: https://eggjs.org