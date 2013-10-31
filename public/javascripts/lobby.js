window.onload = function() {
    var socket = io.connect();
    socket.emit('lobby/init');

    var inited = false;

    socket.on('lobby/init', function(data) {
        if (inited == true) {
            return;
        }
        for (var roomId in data.rooms) {
            if (data.rooms[roomId] != null && data.rooms[roomId].status == true) {
                addRoom(roomId);
                for (var policeId in data.rooms[roomId].polices) {
                    var buttonId = 'room' + roomId + '-police' + policeId;
                    if (data.rooms[roomId].polices[policeId] != null) {
                        changeButtonOn(buttonId);
                    }
                }
                for (var thiefId in data.rooms[roomId].thieves) {
                    var buttonId = 'room' + roomId + '-thief' + thiefId;
                    if (data.rooms[roomId].thieves[thiefId] != null) {
                        changeButtonOn(buttonId);
                    }
                }
            }
        }
        inited = true;
    });

    socket.on('lobby/add', function(data) {
        addRoom(data.roomId);
    });

    socket.on('lobby/delete', function(data) {
        document.getElementById("room-list").deleteRow(data.rowNumber);
    });

    socket.on('lobby/join', function(data) {
        var buttonId = "room" + data.roomId + "-" + data.role + data.roleId;
        location.href="/stage";
        changeButtonOn(buttonId);
    });

    socket.on('lobby/leave', function(data) {
        var buttonId = "room" + data.roomId + "-" + data.role + data.roleId;
        changeButtonOff(buttonId);
    });

    document.addEventListener("click", function(e) {

        var id = e.target.id;
        var className = e.target.className;

        if (id.match(/room.-police|room.-thief/)) {
            var idInfo = id.match(/room(\d+)-(police|thief)(\d+)/);
            var idInfoJson = {
                roomId: idInfo[1],
                role: idInfo[2], // police or thierf
                roleId: idInfo[3]
            }
            if (className.match(/btn-default/)) { // join
                socket.emit('lobby/join', idInfoJson);
            } else if (className.match(/btn-primary/)) { // leave
                socket.emit('lobby/leave', idInfoJson);
            }
        }
    });

    document.getElementById("add-room").addEventListener('click', function(e) {
        socket.emit('lobby/add');
    });

    document.getElementById("room-list").addEventListener('click', function(e) {
        var className = e.target.className;

        if (className.match(new RegExp("delete-room"))) {
            var roomTagId = e.target.parentNode.parentNode.id;
            roomId = roomTagId.match(/room(\d+)/)[1]|0;
            socket.emit('lobby/delete', {roomId: roomId});

        }
    });

    function addRoom(roomId) {

        if (roomId == null) {
            var simpleModal = new SimpleModal({"hideHeader":true, "closeButton":false, "btn_ok":"Close"});
            simpleModal.show({
                "model":"alert",
                "contents":"You can't create room more. Maximum number of rooms is 5."
            });
            return;
        }

        var table = document.getElementById("room-list");
        if (inited) {
            var row = table.insertRow(roomId);
        } else {
            var row = table.insertRow(-1);
        }
        row.id = "room" + roomId;
        var cell = row.insertCell(-1);
        cell.innerHTML = "# " + roomId;
        for (var policeId = 1; policeId <= 4; policeId++) {
            var cell = row.insertCell(-1);
            cell.className = "pbm";
            var button = createButton(
                "room" + roomId + "-police" + policeId,
                "btn btn-block btn-lg btn-default btn-join",
                "no user"
            );
            cell.appendChild(button);
        }
        for (var thiefId = 1; thiefId <= 1; thiefId++) {
            var cell = row.insertCell(-1);
            cell.className = "pbm";
            var button = createButton(
                "room" + roomId + "-thief" + thiefId,
                "btn btn-block btn-lg btn-default btn-join",
                "no user"
            );
            cell.appendChild(button);
        }
        var cell = row.insertCell(-1);
        cell.className = "pbm";
        var button = createButton(
            "room" + roomId + "-delete",
            "btn btn-block btn-lg btn-danger delete-room",
            "delete"
        );
        cell.appendChild(button);
    }

    function createButton(id, className, innerHTML) {
        var button = document.createElement("button");
        button.id = id;
        button.className = className;
        button.innerHTML = innerHTML;
        return button;
    }

    function changeButtonOn(buttonId) {
        var button = document.getElementById(buttonId);
        if (button != null) {
            button.className = button.className.replace("btn-default", "btn-primary");
            button.innerHTML = "userName";
        }
    }

    function changeButtonOff(buttonId) {
        var button = document.getElementById(buttonId);
        if (button != null) {
            button.className = button.className.replace("btn-primary", "btn-default");
            button.innerHTML = "no user";
        }
    }
};
