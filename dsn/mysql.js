module.exports = function (dnsList) {
    var mem = {};
    return function (dns, cb) {
        if (mem[dns] == undefined) {
            mem[dns] = require('mysql').createConnection(dnsList[dns]);
        }
        cb(mem[dns]);
    };
};
