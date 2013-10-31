module.exports = function () {
    this.route = function (app) {
        app.get('/lobby', function (req, res) {
            if (req.session.userId === undefined) {
                res.redirect('/');
                return;
            }
            res.render('lobby', {
                userId : req.session.userId,
                maxPoliceNum : 4
            });
        });
    };
};
