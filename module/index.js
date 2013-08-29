module.exports = function (param) {
    return {
        user : require('./user'),
        room : require('./room')(param),
        util : require('./util'),
        game : require('./game')
    };
};
