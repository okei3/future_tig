module.exports = function (dsnList) {
    var mem = {};
    return function (dsn, cb) {
        if (mem[dsn] == undefined) {
            mem[dsn] = require('redis').createClient(
                dsnList[dsn].port,
                dsnList[dsn].host
            );
            mem[dsn].select(
                dsnList[dsn].db,
                function (err, reply) {
                    cb(mem[dsn]);
                }
            );
        }
        cb(mem[dsn]);
    };
};
