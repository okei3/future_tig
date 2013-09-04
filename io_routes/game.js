module.exports = function (io, module) {
    io.route('game/init', function(req) {
        var data = req.data;
        console.log(data);
        req.session.chatId = data.chatId;
        req.io.join(data.chatId);
    });
    io.route('game/send', function (req) {
        var data = req.data;
        var chatId = req.session.chatId;
        data.user = req.session.user_id;
        io.sockets.in(chatId).emit("chat/stream", data);
    });
    io.route('player sync send', function(req) {
        console.log(req["data"]);
        io.sockets.emit("player sync push", req["data"]);
        //io.sockets.in().emit("chat/stream", "data");
    });
    io.route('game play', function(req) {
        //console.log(req["sessionID"]);
        io.sockets.emit("game prepare", req["sessionID"]);
        //socket.emit("game prepare", req["sessionID"]);
        //io.sockets.in().emit("chat/stream", "data");
    });
};
