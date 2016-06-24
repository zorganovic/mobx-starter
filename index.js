/**
 * Bootstrap our server
 */

//require('source-map-support').install()
require('./src/shared/polyfills')
require('./src/shared/bootstrap')
require('./src/shared/console')

require('babel-register')
require('isomorphic-fetch')
require('./src/server/index')

// Compile bundles (stdio needed to see output)
const path = require('path');
const spawn = require('child_process').spawn;
const child = spawn('node', [path.join(__dirname, 'configuration/webpack.config.dev.js')])

// Output stdout to screen
child.stdout.on('data', data => process.stdout.write(data.toString()) )
child.stderr.on('data', data => process.stderr.write(data.toString()) )

// Exit if children get stuck
process.on('exit', () => child.kill());

// Memory leak detection
if (process.argv.slice(2).includes('-m')) {
    require('./src/server/helpers/heapdump')
}
