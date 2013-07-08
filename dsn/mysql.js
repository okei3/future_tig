module.exports = function (dns_list) {
    var mem = {};
    return function (dns, cb) {
        if (mem[dns] == undefined) {
            mem[dns] = require('mysql').createConnection(dns_list[dns]);
        }
        cb(mem[dns]);
    };
};
