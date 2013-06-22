module.exports = {
    route : function (app) {
        app.get('/home', function (req, res) {
            if (req.session.user_id === undefined) {
                res.redirect('/');
            } else {
                res.sendfile('home.html');
            }
        });
    }
};
