module.exports = function () {
    this.route = function (app) {
        var self = this;
        app.get('/sample', function (req, res) {
            if (req.session.user_id === undefined) {
                res.redirect('/');
                return;
            }
            res.render('sample', {user_id : req.session.user_id});
        });
    }
};
