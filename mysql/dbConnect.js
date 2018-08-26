
var mysql = require('mysql');
var fs = require('fs');
function connectionPool (config) {

    var credentials = config.database.credentials;
    var ssl = {
        ca: fs.readFileSync("./mysql/ssl/cleardb-ca.pem"),
        key: fs.readFileSync("./mysql/ssl/b9082f69ccfec3-key.pem"),
        cert: fs.readFileSync("./mysql/ssl/b9082f69ccfec3-cert.pem")
    }

    var poolConfig = {
        connectionLimit: 20,
        user: credentials.user,
        password: credentials.password,
        database: credentials.name,
        host: credentials.host,
        ssl: ssl,
        debug: false,
        connectionTimeout: 120000,
        timeout: 120000
    }

    return mysql.createPool(poolConfig);
}

module.exports = connectionPool;