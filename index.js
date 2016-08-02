/**
 * Bootstrap our server
 */

require('source-map-support').install()
require('./src/shared/polyfills')
require('./src/shared/bootstrap')
require('./src/shared/console')

require('babel-register')
require('isomorphic-fetch')
require('./src/server/index')

// Compile files on PROD or launch DEV server
if (process.env.NODE_ENV === 'production') {
    require('./configuration/webpack.prod.js')
} else {
    require('./configuration/webpack.dev.js')
}
