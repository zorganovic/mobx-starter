import logger from 'debug'
import _ from 'lodash'
import Koa from 'koa'
import bodyParser from 'koa-better-body'
import favicon from 'koa-favicon'
import serve from 'koa-static2'
import Router from 'koa-router'
import config from './config'
import context from './middleware/context'
//import catcher from './middleware/catcher'
import render from './actions/render'
import account from './actions/account'
import todos from './actions/todos'

const app = new Koa()
const router = new Router()

// Middleware
app.use(favicon(config.http.favicon))
app.use(bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
    bufferLimit: '4mb'
}))

// Needed for authentication
app.use(context)

// Routes
app.use(todos.routes())
app.use(account.routes())
//app.use(catcher)
app.use(render)
/*app.use(async(ctx, next) => {
    logger(`app:+++++`)('DONE!')
    //ctx.body = '<!DOCTYPE html>\n' + 'done'
    await next()
})*/

// Serve static files
_.each(config.http.static, staticRoute => {
    logger('app:static')(staticRoute.path)
    app.use(serve(staticRoute.url, staticRoute.path))
})

app.listen(config.http.port, function() {
    logger('app:start')('Listening on port ' + config.http.port)
})
