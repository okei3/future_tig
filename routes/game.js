module.exports = function () {
    this.route = function (app) {
        var self = this;
        app.get('/game', function (req, res) {
            if (req.session.userId === undefined) {
                res.redirect('/');
                return;
            }
            res.render('game', {user_id : req.session.userId});
        });
    }
};
