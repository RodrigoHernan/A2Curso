var jdt = require('jwt-simple'),
    moment = require('moment'),
    expiration = require('../config/tokenExpiration'),
    secret = require('../config/tokenSecret');

module.exports = function crearToken(username){
    "use strinct";
    var payload = {
        sub: username,
        iat: moment().unix,
        exp: moment().add(expiration.amount_time, expiration.type_time).unix()
    };
    var token = jwt.encode(payload, secret);
    return token

}