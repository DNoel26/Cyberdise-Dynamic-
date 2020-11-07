const request_ip = require("request-ip");
 
const ip_middleware = function(req, res, next){

    const clientIp = request_ip.getClientIp(req); 
    next();
};

module.exports = ip_middleware;