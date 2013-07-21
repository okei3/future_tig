module.exports = function (dnsList) {
    var mem = {};
    return function (dns, cb) {
        if (mem[dns] == undefined) {
            mem[dns] = require('redis').createClient(
                dnsList[dns].port,
                dnsList[dns].host
            );
            mem[dns].select(
                dnsList[dns].db,
                function (err, reply) {
                    cb(mem[dns]);
                }
            );
        }
        cb(mem[dns]);
    };
};
