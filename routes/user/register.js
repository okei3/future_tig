module.exports = function () {
    this.route = function (app) {
        var self = this;
        app.post('/user/register', function (req, res) {
            var name = req.param('name');
            var mail = req.param('mail');
            var pass = req.param('pass');
            if (pass === undefined) {
                res.redirect('/');
            }
            self.modules.user.id.register(name, mail, pass)(function(err, ret) {
                if (err) {
                    req.render('error', {msg: err.msg});
                }
                if (ret.affectedRows === 0) {
                    var msg = 'the mail address has been already registered(' + mail + ')';
                    res.render('error', {msg : msg});
                } else {
                    req.session.regenerate(function(err) {
                        if (err) {
                            res.redirect('/');
                        }
                        req.session.userId = ret.insertId;
                        res.redirect('/home');
                    })
                }
            })
        });
    };
};
