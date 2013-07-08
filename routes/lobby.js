module.exports = function () {
    this.route = function (app) {
        var self = this;
        app.get('/lobby', function (req, res) {
            var repo = new self.modules.room.repository();
            repo.list(function (err, results) {
                if (err) {
                    res.redirect('/home');
                    return;
                }
                res.render('lobby', {rooms : results});
            });
        });
    };
};
