module.exports = function (dsnList) {
    var mem = {};
    return function (dsn, cb) {
        if (mem[dsn] == undefined) {
            mem[dsn] = require('mysql').createConnection(dsnList[dsn]);
        }
        cb(mem[dsn]);
    };
};
