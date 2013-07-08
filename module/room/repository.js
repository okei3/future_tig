module.exports = function () {
    this.createTable = function () {
        this.dsn.mysql('main', function (conn) {
            conn.query('create table room (id int, name varchar(100))');
        });
    };
    this.list = function (cb) {
        this.dsn.mysql('main', function (conn) {
            conn.query('select id, name from room', cb);
        });
    };
};
