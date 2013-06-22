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

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.post('/login', function (req, res) {
    var id = req.body.id;
    var password = req.body.password;
    if (id === undefined || password === undefined) {
        res.redirect('/');
    } else {
        var user_id = null;//tmp
        if (user_id === null) {
            res.redirect('/');
        } else {
            req.session.user_id = user_id;
            req.session.regenerate(function (err) {
                if (err) {
                    res.redirect('/');
                }
                res.redirect('/index?user_id=' + user_id);
            });
        }
    }
});

app.configure('development', function () {
    app.listen(8080);
});
