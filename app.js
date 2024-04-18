let Koa = require('koa');
let app = new Koa();

const redis = require('redis');
let rds = redis.createClient({url: "redis://redis:6379"});
rds.on('connect', ()=> console.log('redis connect ok'))
rds.connect();


let log4js = require('log4js');
log4js.configure('./log4js.json');
log4js.level = 'DEBUG';
let logger = log4js.getLogger('app');

let Router = require('koa-router');

let router = new Router;

router.all('/', async ctx =>{
    logger.info('on index page')
    ctx.body = `<div style="width:500px;height:200px;margin:0 auto;font-size:100px">index page</div>`
});

router.all('/hello/:name', async ctx =>{
    let name = ctx.params.name
    logger.info('on hello page')
    ctx.body = `hello ${name ? name : 'world'}`
});

router.all('/redis', async ctx =>{
    // let count = await rds.incr("count")
    let count = 20
    logger.info(`on test redis page, count ${count}`)
    ctx.body = `<div style="width:700px;height:200px;margin:0 auto;font-size:60px">on test redis page, count ${count}</div> `
});

app.use(router.routes());

let port = process.env.PORT || 8080;
try{
    app.listen(8080);
    logger.info('Server started successfully and listened on '+ port +'\n'+'http://localhost:'+port);
}catch(err){
    console.error(err);
}
