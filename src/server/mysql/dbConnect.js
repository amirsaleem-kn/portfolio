
var mysql = require('mysql');
var fs = require('fs');

// Establish a secure connection with MySQL server

function connectionPool (config) {

    var pool;

    var credentials = config.database.credentials;

    var ssl = {
        ca: fs.readFileSync("./src/server/mysql/ssl/cleardb-ca.pem"),
        key: fs.readFileSync("./src/server/mysql/ssl/b9082f69ccfec3-key.pem"),
        cert: fs.readFileSync("./src/server/mysql/ssl/b9082f69ccfec3-cert.pem")
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
    };

    pool = mysql.createPool(poolConfig);

    return pool;
}

module.exports = connectionPool;