module.exports = {
    route : function (app) {
        app.post('/login', function (req, res) {
            var id = req.body.id;
            var password = req.body.password;
            if (id === undefined || password === undefined) {
                res.redirect('/');
            } else {
                var user_id = 1;//tmp
                if (user_id === null) {
                    res.redirect('/');
                } else {
                    req.session.user_id = user_id;
                    req.session.regenerate(function (err) {
                        if (err) {
                            res.redirect('/');
                        }
                        res.redirect('/index?user_id=' + user_id);
                    });
                }
            }
        });
    }
};
