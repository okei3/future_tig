module.exports = function (param) {
    return {
        user : require('./user'),
        room : require('./room')(param)
    };
};
