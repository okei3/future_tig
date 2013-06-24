var express = require('express.io');
var app = express();
var auth = require('http-auth');
var http_auth = auth({
    authRealm : 'developer',
    authType : 'digest',
    authFile : 'conf/developers'
});

app.use(express.cookieParser());
app.use(express.session({secret:'6CQAorGwCNt4XfjhBsQF0g3whwl9gWYw'}));
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.configure('development', function () {
    app.all('*', function (req, res, next) {
        http_auth.apply(req, res, function (username) {
            next();
        });
    });
});

var modules = require('./module');
app.http().io();
require('./routes')(app, modules);
require('./io_routes')(app.io, modules);

app.configure('development', function () {
    app.listen(8080);
});
