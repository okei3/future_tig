module.exports = function () {
    this.route = function (app) {
        app.get('/game', function (req, res) {
            /*if (req.session.user_id === undefined) {
                res.redirect('/');
                return;
            }*/
            res.render('game', {});
            //res.render('game', {user_id : req.session.user_id});
        });
    };
};
