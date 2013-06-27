var config = require('./conf/' + process.env.NODE_ENV);
var dsn = require('./dsn')(config.dsn);
var modules = require('./module');
dsn.redis('main', function (redis) {
    var app = require('./init')({
        config : config,
        sessionRedis : redis
    });
    require('./routes')(app, modules);
    require('./io_routes')(app.io, modules);
    app.listen(config.port);
});
