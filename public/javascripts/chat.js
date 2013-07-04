var chatId = location.pathname.match(/([0-9]+)\/?$/)[1];
window.onload = function(){
    var socket = io.connect(location.origin);
    socket.json.emit("chat/init", {chatId: chatId});
    socket.on('chat/stream', function (data) {
        console.log(data);
        var messageElement = document.createElement("div");
        messageElement.innerHTML = data.user + ": " + data.message;
        document.getElementById("message-container").appendChild(messageElement);
    });

    var chatForm = document.getElementById("chat-form");
    chatForm.onkeypress = function(evt) {
        if(evt.keyCode == 13){
            socket.emit(
                'chat/send',
                { message: chatForm.value, chatId: chatId}
            );
            chatForm.value = "";
        }
    };
};
