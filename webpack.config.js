/**
 * INTRODUCTON
 * ----------------------------------------------------
 * Webpack is a module bundler for modern Javascript applications.
 */

const path = require('path');
const webpack = require('webpack');

// import for plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

// plugins array

const plugins = [
    new webpack.DefinePlugin({ SOCKET_URL: JSON.stringify(process.env.SOCKET_URL ? process.env.SOCKET_URL : 'wss://localhost:8080') }),
    new webpack.HotModuleReplacementPlugin({ multiStep: true }),
    new MiniCssExtractPlugin( {filename: "[name].css", chunkFilename: "[id].css" })
];

// file rules

const jsRule =  {   
    test: /.jsx?$/,
    exclude: /node_modules/,
    use: [{ loader: 'babel-loader', query: { presets: ['react', 'es2015', 'stage-1'] } }]
};

const htmlRule = {
    test: /\.html$/,
    exclude: /node_modules/,
    use: [ { loader: 'html-loader', options: { minimize: true } } ]
};

const scssRule = {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [ 
        MiniCssExtractPlugin.loader, 
        "css-loader", 
        "postcss-loader", "sass-loader" ],
};

// main config object

module.exports = {
    entry: [ 
        'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr&timeout=20000', 
        './src/client/bundle.js'
    ],
    output: { path: `${__dirname}'/dist/client'`, publicPath: '/', filename: './dist/client/bundle.js' },
    watch: true,
    devtool: "source-map",
    module: { rules: [ jsRule, scssRule ] },
    plugins: plugins,
    mode: 'development'
}