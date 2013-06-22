var express = require('express');
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

require('./routes/index').route(app);
require('./routes/login').route(app);
require('./routes/home').route(app);

app.configure('development', function () {
    app.listen(8080);
});
