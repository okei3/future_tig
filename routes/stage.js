module.exports = function () {
    this.route = function (app) {
        var self = this;
        app.get('/stage', function (req, res) {
            if (req.session.userId === undefined) {
                res.redirect('/');
                return;
            }
            res.render('stage', {userId : req.session.userId});
        });
    }
};
