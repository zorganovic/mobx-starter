require('./../src/shared/bootstrap')
require('./../src/shared/console')
const path = require('path')
const sources = path.join(__dirname, '../src')
const ExtractCSS = require('extract-text-webpack-plugin')
const config = {
    entry: {},
    context: sources,
    node: {
        global: true,
        fs: 'empty'
    },
    module: {
        //noParse: ['localforage', 'video.js'],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: sources,
                babelrc: false,
                query: {
                    cacheDirectory: true,
                    plugins: [
                        "add-module-exports",
                        "transform-decorators-legacy",
                        "transform-class-properties",
                        "transform-es2015-arrow-functions",
                        "transform-es2015-block-scoping",
                        "transform-es2015-block-scoped-functions",
                        "transform-es2015-classes",
                        "transform-es2015-computed-properties",
                        "transform-es2015-destructuring",
                        "transform-es2015-literals",
                        "transform-es2015-template-literals",
                        "transform-es2015-parameters",
                        "transform-es2015-shorthand-properties",
                        "transform-es2015-spread",
                        "transform-react-jsx",
                        "syntax-async-functions",
                        "fast-async"
                    ]
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                include: sources
            },
            {
                test: /\.(jpg|png|ttf|otf|eot|svg|woff2?)(\?.+)?$/,
                loader: 'file-loader',
                include: path.join(sources, 'assets')
            },
            {
                test: /\.(css|scss)(\?.+)?$/,
                loader: ExtractCSS.extract(['css', 'sass']),
                include: path.join(sources, 'assets')
            }
        ]
    },
    output: {
        filename: '[name].js',
        //libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, '../build'),
        publicPath: 'http://localhost:2002/build/'
        //pathinfo: true
        //publicPath: './' // relative paths for CSS files
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [],
        packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
    },
    plugins: [
        //new webpack.ProvidePlugin({ 'Promise': 'bluebird' }),
        new ExtractCSS('[name].css', { allChunks: true })
    ]
};


module.exports = config
