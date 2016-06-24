import mongoose from 'mongoose'

// Use bluebird
mongoose.Promise = global.Promise

// Initialize our database
mongoose.connect('mongodb://127.0.0.1:27017/todos')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongodb error:'))
db.once('open', console.info.bind(console, 'Mongodb started on port 27017'))

// Initialize our models
export default {
    connection: db,
    session: db.model('Session', require('../models/Session')),
    todos: db.model('Todo', require('../models/Todo'))
}
