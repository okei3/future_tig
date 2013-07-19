module.exports = function() {
    this.route = function (app) {
        var self = this;
        app.get('/logout', function (req, res) {
            req.session.destroy();
            res.redirect('/');
        });
    };
}
