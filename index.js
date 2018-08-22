var express = require('express');
var app = express();
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config.js');
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler, { path: '/__webpack_hmr', publicPath: 'http://localhost:8080/', heartbeat: 10 * 1000 }));

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('views', __dirname+'/views');

app.use("/dist/client", express.static(__dirname+"/dist/client"));

app.get('*', (req, res) => {
    res.render('index');
});

var port = process.env.port || 8080;

app.listen(port, () => {
    console.log(`listening to port: ${port}`);
});