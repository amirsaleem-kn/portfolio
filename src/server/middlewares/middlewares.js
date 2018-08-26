function authenticateUser (req, res, next) {
    return next();
}

var middlewares = {
    authenticateUser: authenticateUser
}

module.exports = middlewares;