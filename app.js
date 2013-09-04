var config = require('./conf/' + process.env.NODE_ENV);
var clystal = require('clystal').init(config);
var dsn = require('./dsn')(config.dsn);
var modules = require('./module')({config : config, dsn : dsn});
dsn.redis('main', function (redis) {
    var app = require('./init')({
        config : config,
        sessionRedis : redis
    });
    require('./routes')(app, modules);
    require('./io_routes')(app.io, modules);
    require('./io_routes/game.js')(app.io, modules);
    app.listen(config.port);
});
