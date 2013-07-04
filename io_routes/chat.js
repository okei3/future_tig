module.exports = function (io, module) {
    io.route('chat/init', function(req) {
        var data = req.data;
        console.log(data);
        req.session.chatId = data.chatId;
        req.io.join(data.chatId);
    });
    io.route('chat/send', function (req) {
        var data = req.data;
        console.log(data);
        var chatId = req.session.chatId;
        data.user = req.session.user_id;
        io.sockets.in(chatId).emit("chat/stream", data);
    });
};
