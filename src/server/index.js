import fp from 'lodash/fp'
import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import favicon from 'serve-favicon'
import passport from 'passport'
import config from '../../configuration/server.config'
import db from './helpers/database'
import seedTodos from './helpers/seedTodos'
import todos from './routes/todos'
import render from './routes/render'

const app = express()
const MongoStore = connectMongo(session)

// Serve static files
if (fp.size(config.http.static)) {
    fp.map(route => {
        console.debug('[Static] %s -', route.url, route.path)
        app.use(route.url, express.static(route.path))
    })(config.http.static)
}

// Middleware
app.use(favicon(config.http.favicon))
app.use(bodyParser.json({ limit: '2mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db.connection })
}))
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use(todos)
app.use(render)

// Add some data to db for testing purposes
// You can remove this when you don't need it anymore
seedTodos()

app.listen(config.http.port, function() {
    console.info('HTTP Server listening on port', config.http.port)
})
