module.exports = function (io, module) {
    io.route('ready', function (req) {
        req.io.emit('identify', {
            access_user_id : req.session.userId
        });
    });
};
