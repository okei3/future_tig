var config = require('./conf/' + process.env.NODE_ENV);
var dsn = require('./dsn')(config.dsn);
dsn.redis('main', function (redis) {
    var express = require('express.io');
    var app = express();
    app.http().io();
    app.use(express.cookieParser());
    app.use(express.session({
        store : new (require('connect-redis')(express))({
            client: redis
        }),
        secret : config.sessionSecret
    }));
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));

    app.configure('development', function () {
        var auth = require('http-auth');
        var http_auth = auth({
            authRealm : 'developer',
            authType : 'digest',
            authFile : 'conf/developers'
        });
        app.all('*', function (req, res, next) {
            http_auth.apply(req, res, function (username) {
                next();
            });
        });
    });

    var modules = require('./module');

    app.io.set('origins', config.domain + ':' + config.port);
    require('./routes')(app, modules);
    require('./io_routes')(app.io, modules);

    app.listen(config.port);
});
