window.addEventListener('load', function() {
    var socket = io.connect();
    var text = document.getElementById('text');
    socket.on('connect', function() {
        document.getElementById('input').addEventListener('submit', function(ev) {
            socket.emit('game/move', {
                position: text.value
            });
            text.value = '';

            return false;
        });
    });
    socket.on('game/move', function(data) {
        updateTableData(data);
    });

    function updateTableData(data) {
        for (var userId in data) {
            var position = data[userId];
            getRow(userId).lastElementChild.innerHTML = position;
        }
    }

    function getRow(userId) {
        var id  = 'row-' + userId;
        var row = document.getElementById(id);
        if (!row) {
            row = document.createElement('tr');
            row.id = id;

            var th = document.createElement('th');
            th.innerHTML = userId;
            row.appendChild(th);
            row.appendChild(document.createElement('td'));
            document.getElementById('positions').appendChild(row);
        }

        return row;
    }
});
