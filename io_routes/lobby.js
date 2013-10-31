module.exports = function (io, module) {

    const DEFAULT_ROOM_NUM = 3;
    const MAX_ROOM_NUM = 5;
    const POLICE_NUM = 4;
    const THIEF_NUM = 1;

    var rooms = new Array(MAX_ROOM_NUM); // index 0 is header

    for (var i = 1; i <= DEFAULT_ROOM_NUM; i++) {
        rooms[i] = getNewRoom();
    }

    function getNewRoom() {
        var polices = new Array(POLICE_NUM); // index 0 is header
        for (var i = 1; i <= POLICE_NUM; i++) {
            polices[i] = null;
        }
        var thieves = new Array(THIEF_NUM); // index 0 is header
        for (var i = 1; i <= THIEF_NUM; i++) {
            thieves[i] = null;
        }
        return {
            status: true,
            polices: polices,
            thieves: thieves
        };
    }

    function getUndefinedRoomId() {
        for (var i = 1; i < MAX_ROOM_NUM + 1; i++) {
            if (typeof rooms[i] === "undefined" || rooms[i].status === false) {
                return i;
            }
        }
        return null;
    }

    function getRowNumberByRoomId(roomId) {
        var index = 1;
        for (var i in rooms) {
            if (i == roomId) {
                break;
            }
            if (rooms[i].status === true) {
                index++;
            }
        }
        return index;
    }

    io.route('lobby/init', function(req) {
        io.sockets.emit('lobby/init', {rooms: rooms});
    });

    io.route('lobby/add', function(req) {
        var roomId = getUndefinedRoomId();
        rooms[roomId] = getNewRoom();
        io.sockets.emit('lobby/add', {
            roomId: roomId,
        });
    });

    io.route('lobby/delete', function(req) {
        var rowNumber = getRowNumberByRoomId(req.data.roomId);
        rooms[req.data.roomId].status = false;
        io.sockets.emit('lobby/delete', {
            rowNumber: rowNumber
        });
    });

    io.route('lobby/join', function(req) {
        if (req.data.role == "police") {
            rooms[req.data.roomId].polices[req.data.roleId] = 1; // userId
        } else if (req.data.role == "thief") {
            rooms[req.data.roomId].thieves[req.data.roleId] = 1; // userId
        }
        io.sockets.emit('lobby/join', req.data);
    });

    io.route('lobby/leave', function(req) {
        if (req.data.role == "police") {
            rooms[req.data.roomId].polices[req.data.roleId] = null;
        } else if (req.data.role == "thief") {
            rooms[req.data.roomId].thieves[req.data.roleId] = null;
        }
        io.sockets.emit('lobby/leave', req.data);
    });
};
