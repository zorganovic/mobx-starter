/**
 * Bootstrap core and webpack
 */
require('./core/compile')
require('./core/logger')
require('./core/polyfills')

/**
 * Bootstrap our server
 */
require('babel-register')
require('./server/server')
