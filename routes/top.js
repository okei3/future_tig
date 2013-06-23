module.exports = function (app, modules) {
    app.get('/', function (req, res) {
        res.sendfile('htdocs/index.html');
    });
};
