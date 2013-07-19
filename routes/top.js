module.exports = function() {
    this.route = function (app) {
        app.get('/', function (req, res) {
            res.render('index');
        });
    };
};
