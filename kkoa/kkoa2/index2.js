const KKoa2 = require('./kkoa2');

const app = new KKoa2();

const Routers = require('./krouter');

const router = new Routers();

router.get('/home', (ctx) => {
    ctx.body = 'this is home';
})

router.get('/user', (ctx) => {
    ctx.body = 'this is tom, he age 18';
})

app.use(router.routers());

app.listen(3030);