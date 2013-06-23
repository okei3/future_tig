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

app.configure('development', function () {
    app.all('*', function (req, res, next) {
        http_auth.apply(req, res, function (username) {
            next();
        });
    });
});

var modules = {};

require('./routes/index')(app, modules);
require('./routes/login')(app, modules);
require('./routes/home')(app, modules);

app.configure('development', function () {
    app.listen(8080);
});
