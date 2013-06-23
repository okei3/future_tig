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

require('./routes')(app, require('./module'));

app.http().io();
app.io.route('ready', function (req) {
    req.io.emit('identify', {
        access_user_id : req.session.user_id
    });
});

app.configure('development', function () {
    app.listen(8080);
});
