var express = require('express');
var app = express();
var auth = require('http-auth');
var http_auth = auth({
    authRealm : 'developer',
    authType : 'digest',
    authFile : 'conf/developers'
});

app.configure('development', function () {
    app.all('*', function (req, res, next) {
        http_auth.apply(req, res, function (username) {
            next();
        });
    });
});

app.get('/', function(req,  res) {
    res.sendfile('index.html');
});

app.configure('development', function () {
    app.listen(8080);
    console.log('listening');
});
