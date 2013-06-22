module.exports = {
    route : function (app) {
        app.post('/login', function (req, res) {
            var id = req.body.id;
            var password = req.body.password;
            if (id === undefined || password === undefined) {
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
    }
};
