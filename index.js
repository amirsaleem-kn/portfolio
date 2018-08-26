var express = require('express');
var compression = require("compression");
var bodyParser = require("body-parser");
var appConfig = require("./config.js");

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, appID, empID, version, token");
    next();
});

app.use(bodyParser.urlencoded({ "limit":"50mb",extended: true }))
app.use(compression());

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('views', __dirname+'/views');

if(appConfig.environment != 'production') {

    var localIP = require('./localIP.js');
    var webpack = require('webpack');
    var webpackDevServer = require('webpack-dev-server');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpackConfig = require('./webpack.config.js');
    var compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler, { path: '/__webpack_hmr', publicPath: 'http://localhost:8080/', heartbeat: 10 * 1000 }));

}

app.use("/dist/client", express.static(__dirname+"/dist/client"));

app.get('*', (req, res) => {
    res.render('index', {
        title: "page title",
        localIP: localIP
    });
});

var connectionPool = require('./mysql/dbConnect.js')(appConfig);

var port = process.env.port || appConfig.port || 8080;

app.listen(port, () => {
    console.log(`Server started, listening to port: ${port}`);
});