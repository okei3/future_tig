module.exports = function (app, module) {
    app.get('/home', function (req, res) {
        if (req.session.user_id === undefined) {
            res.redirect('/');
            return;
        }
        res.render('home', {user_id : req.session.user_id});
    });
};
