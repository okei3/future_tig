module.exports = function () {
    this.route = function (app) {
        var self = this;
        app.post('/login', function (req, res) {
            var mail = req.param('mail');
            var pass = req.param('pass');
            if (mail === undefined || pass === undefined) {
                res.redirect('/');
                return;
            }
            self.modules.user.id.authenticate(mail, pass)(function(err, userId) {
                if (err) {
                    res.redirect('/');
                    return;
                } else if (userId === null) {
                    res.redirect('/');
                    return;
                }
                req.session.regenerate(function(err) {
                    if (err) {
                        res.redirect('/');
                        return;
                    }
                    req.session.userId = userId;
                    res.redirect('/home');
                })
            })
        });
    };
};
