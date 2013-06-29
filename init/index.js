module.exports = function (option) {
    var express = require('express.io');
    var app = express();
    app.http().io();
    app.set('views',  __dirname + '/../views');
    app.set('view engine',  'jade');
    app.use(express.cookieParser());
    app.use(express.session({
        store : new (require('connect-redis')(express))({
            client: option.sessionRedis
        }),
        secret : option.config.sessionSecret
    }));
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/../public'));

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
    app.io.set(
        'origins',
        option.config.domain + ':' + option.config.port
    );
    return app;
};
