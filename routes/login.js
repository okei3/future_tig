module.exports = function (app, modules) {
    app.post('/login', function (req, res) {
        var mail = req.param('mail');
        var password = req.param('password');
        if (mail === undefined || password === undefined) {
            res.redirect('/');
            return;
        }
        var user_id = 1;//tmp
        if (user_id === null) {
            res.redirect('/');
            return;
        }
        req.session.regenerate(function (err) {
            if (err) {
                res.redirect('/');
            }
            req.session.user_id = user_id;
            res.redirect('/home');
        });
    });
};
