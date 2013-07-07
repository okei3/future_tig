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
                } else if (userId === null) {
                    res.redirect('/');
                }
                req.session.regenerate(function(err) {
                    if (err) {
                        res.redirect('/');
                    }
                    req.session.userId = userId;
                    res.redirect('/home');
                })
            })
        });
    };
};
