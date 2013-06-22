module.exports = {
    route : function (app) {
        app.get('/home', function (req, res) {
            console.log(req.session.user_id);
            res.sendfile('home.html');
        });
    }
};
