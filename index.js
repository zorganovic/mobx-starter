/**
 * Bootstrap our server
 */
require('./src/shared/polyfills')
require('./src/shared/console')

require('babel-register')
require('isomorphic-fetch')
require('./src/server/index')

process.on('unhandledRejection', console.error.bind(console))

// Compile files on PROD or launch DEV server
if (process.env.NODE_ENV === 'production') {
    require('./config/webpack.prod.js')
} else {
    process.env.DEV = true
    require('./config/webpack.dev.js')
}
