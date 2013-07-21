_ = require('underscore');
Room = require('./room');
module.exports = function () {
    this.createTable = function () {
        this.dsn.mysql('main', function (conn) {
            conn.query('create table room (id int, name varchar(100))');
        });
    };
    this.list = function (cb) {
        this.dsn.mysql('main', function (conn) {
            conn.query('select id, name from room', function (err, results) {
                if (err) {
                    return cb(err, results);
                }
                return cb(err, _.map(results, function (row) {
                    return new Room(row.id, row.name);
                }));
            });
        });
    };
};
