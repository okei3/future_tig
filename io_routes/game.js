var positions = {};
module.exports = function (io, module) {
    io.route('game/move', function(req) {
        console.log(req.session.userId + ':' + req.data.position);
        positions[req.session.userId] = req.data.position;
        io.sockets.emit('game/move', positions);
    });
};
