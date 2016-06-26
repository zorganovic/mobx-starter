const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.config.base.js')

// Merge with base configuration
//-------------------------------
_.merge(config, {
    cache: true,
    target: 'web',
    devtool: 'eval-source-map', // eval eval-cheap-module-source-map source-map
    entry: {
        bundle: [
            './client/client.js',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:2002/'
        ]
    },
    output: {
        libraryTarget: 'var'
    }
})

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'global.isClient': true,
        'process.env.BLUEBIRD_WARNINGS': '0',
        'process.env.NODE_ENV': JSON.stringify('development')
    })
)

console.log('---------------------\n', JSON.stringify(config, null, 4))

// Setup webpack for DEV
//-------------------------------
const compiler = webpack(config)
const compilerConfig = {
    hot: true,
    contentBase: 'build',
    filename: 'bundle.js',
    //publicPath: './',
    publicPath: 'http://localhost:2002/build/',
    watchOptions: {
        //poll: 1400,
        aggregateTimeout: 500,
        ignore: /node_modules|data|build|\.git/
    },
    stats: {
        colors: true,
        hash: false,
        chunks: false,
        version: false,
        chunkModules: false
    }
}

// Launch DEV server
//-------------------------------
const WebpackDevServer = require('webpack-dev-server')
const server = new WebpackDevServer(compiler, compilerConfig)
server.listen(2002, function() {
    console.debug('Webpack DEV Server running on port 2002')
})


module.exports = config
