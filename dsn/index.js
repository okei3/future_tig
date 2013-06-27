module.exports = function (dns) {
    return {
        redis : require('./redis')(dns.redis)
    };
}
