var appConfig = require("../config.js");
var pool = require('./dbConnect.js')(appConfig);

function getConnection() {
    return pool.getConnection(function(err, conn){
        return conn;
    });
}

module.exports = getConnection;