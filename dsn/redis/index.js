module.exports = function (dns_list) {
    var mem = {};
    return {
        get : function (dns, cb) {
            if (mem[dns] == undefined) {
                mem[dns] = require('redis').createClient(
                    dns_list[dns].port,
                    dns_list[dns].host
                );
                mem[dns].select(
                    dns_list[dns].db,
                    function (err, reply) {
                        cb(mem[dns]);
                    }
                );
            }
            cb(mem[dns]);
        }
    };
}
