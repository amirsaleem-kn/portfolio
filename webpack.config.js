/**
 * INTRODUCTON
 * ----------------------------------------------------
 * Webpack is a module bundler for modern Javascript applications.
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr',
        './src/client/bundle.js'
    ],
    output: {
        path: __dirname+'/dist/client',
        publicPath: path.resolve(__dirname, '/dist/client'),
        filename: 'bundle.js'
    },
    watch: true,
    devtool: "source-map",
    module: {
        rules: [
                {   
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            query: {
                                presets: ['react', 'es2015', 'stage-1']
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract( { fallback: 'style-loader', use: 'css-loader' } )
                }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
        new ExtractTextPlugin({ filename: 'bundle.css' })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: path.join(__dirname, '/dist'),
        host: 'localhost',
        port: 3000,
        publicPath: path.resolve(__dirname, '/dist/client'),
        proxy: {
          '**': {
            target: 'http://localhost:8080/',
            secure: false
          }
        }
    },
    mode: 'development'
}