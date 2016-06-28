const fp = require('lodash/fp')
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const favicon = require('serve-favicon')
const passport = require('passport')
const config = require('../../configuration/server.config')
const db = require('./helpers/database')
const seedTodos = require('./helpers/seedTodos')
const todos = require('./routes/todos')
const render = require('./routes/render')

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
