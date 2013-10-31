module.exports = function () {
    this.route = function (app) {
        var self = this;
        app.get('/lobby_sample', function (req, res) {
            var repo = new self.modules.room.repository();
            repo.list(function (err, results) {
                if (err) {
                    res.redirect('/home');
                    return;
                }
                res.render('lobby_sample', {rooms : results});
            });
        });
    };
};
