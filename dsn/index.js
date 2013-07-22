module.exports = function (dsn) {
    return {
        redis : require('./redis')(dsn.redis),
        mysql : require('./mysql')(dsn.mysql)
    };
}
