module.exports = function (app, modules) {
    app.get('/', function (req, res) {
        res.render('index');
    });
};
