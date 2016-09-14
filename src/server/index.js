import logger from 'debug'
import isArray from 'lodash/fp/isArray'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import favicon from 'serve-favicon'
import compression from 'compression'
import config from '../../config/server'
import context from './middleware/context'
import render from './middleware/render'
import todos from './routes/todos'
import account from './routes/account'

const app = express()

// Serve static files
if (isArray(config.http.static)) {
    config.http.static.forEach(staticRoute => {
        logger('inferno:static')(staticRoute.path)
        app.use(staticRoute.url, express.static(staticRoute.path))
    })
}

// Config
app.disable('x-powered-by')
app.use(compression())

// Middleware
app.use(favicon(config.http.favicon))
app.use(bodyParser.json({ limit: '2mb' }))
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))

// Needed for authentication
app.use(cookieParser())
app.use(context)

// Routes
app.use(todos)
app.use(account)
app.use(render)

app.listen(config.http.port, function() {
    logger('server:start')('Listening on port ' + config.http.port)
})
