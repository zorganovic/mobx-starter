/**
 * Bootstrap core and webpack
 */
require('./core/compile')
require('./core/helpers/logger')
require('./core/helpers/polyfills')

/**
 * Bootstrap our server
 */
require('babel-register')
require('./src/server/server')
