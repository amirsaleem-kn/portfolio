var express = require('express');
var compression = require("compression");
var bodyParser = require("body-parser");
var appConfig = require("./src/server/config.js");
var events = require('events');
var middlewares = require('./src/server/middlewares/middlewares.js');

// set up an express application
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // allow all origins to make requests
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, appID, empID, version, token");
    res.header("Acess-Control-Allow-Methods", "*"); // allow all HTTP Request Methods
    next();
});

app.use(bodyParser.urlencoded({ "limit":"50mb",extended: true }))
app.use(compression());

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('views', __dirname+'/views');

if(appConfig.environment != 'production') {

    var localIP = require('./src/server/localIP.js'); // get local Ipv4 address of the system
    var webpack = require('webpack');
    var webpackDevServer = require('webpack-dev-server');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpackConfig = require('./webpack.config.js');
    var compiler = webpack(webpackConfig);

    // run webpack, bundle up the packages and prepare HMR

    app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler, { path: '/__webpack_hmr', publicPath: 'http://localhost:8080/', heartbeat: 10 * 1000 }));

}

app.use("/dist/client", express.static(__dirname+"/dist/client"));

var authenticateUser = middlewares.authenticateUser;

app.get('*', authenticateUser,  (req, res) => {
    res.render('index', {
        title: "page title",
        localIP: localIP || null
    });
});

var connectionPool = require('./src/server/mysql/dbConnect.js')(appConfig);

var connectionCreated = new events.EventEmitter();
connectionCreated.on("connection-created", function(data){
    console.log('A new connection has been created: '+ data);
});

connectionPool.getConnection(function(err, connection){
    if(err) {
        console.log(err);
        return;
    }
    connectionCreated.emit("connection-created", connection.threadId);
    connection.destroy();
})

var port = appConfig.port || process.env.port || 8080;

app.listen(port, () => {
    console.log(`Server started, listening to port: ${port}`);
});