module.exports = function (app, modules) {
    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.redirect('/');
    });
};
