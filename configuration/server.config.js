export default {
    http: {
        port: 2000,
        static: true
    },
    session: {
        secret: 'SUPER_SECRET_KEY_KERE'
    },
    databases: {
        mongo: 'mongodb://127.0.0.1:27017/todos'
    }
}
