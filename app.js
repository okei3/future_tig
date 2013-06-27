var express = require('express.io');
var app = express();

var config;
app.configure('development', function () {
    config = require('./conf/development');
});

var dsn = require('./dsn')(config.dsn);
var RedisStore  =  require('connect-redis')(express);

app.use(express.cookieParser());
dsn.redis.get('main', function (redis) {
    app.use(express.session({
        store : new RedisStore({client: redis}),
        secret : config.sessionSecret
    }));
});
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
app.http().io();
app.io.set('origins', config.host + ':' + config.port);
require('./routes')(app, modules);
require('./io_routes')(app.io, modules);

app.configure('development', function () {
    app.listen(config.port);
});
