module.exports = function (dns) {
    return {
        redis : require('./redis')(dns.redis),
        mysql : require('./mysql')(dns.mysql)
    };
}
