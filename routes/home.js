module.exports = function () {
    this.route = function (app) {
        var self = this;
        app.get('/home', function (req, res) {
            if (req.session.userId === undefined) {
                res.redirect('/');
                return;
            }
            res.render('home', {user_id : req.session.userId});
        });
    }
};
