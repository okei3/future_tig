var nodeData = [
    [3, 3],
    [3, 7],
    [18, 6],
    [16, 13],
    [13, 19],
    [10, 18],
]

window.onload = function() {

    var socket = io.connect();

    const GAME_WIDTH = 320;
    const GAME_HEIGHT = 320;
    const SPRITE_WIDTH = 32;
    const SPRITE_HEIGHT = 32;
    const MAP_DOT_WIDTH = 16;
    const MAP_DOT_HEIGHT = 16;

    var imageFiles = {
        'character': 'image/game/chara7.png',
        'map': 'image/game/map0.png',
    }

    enchant();
    var game = new Game(GAME_WIDTH, GAME_HEIGHT);
    game.fps = 5;

    // preload all image files.
    for (var i in imageFiles) {
        game.preload(imageFiles[i]);
    }

    game.onload = function() {
        var scene = new Scene();

        function Player(position, name) {
            this.character = new Sprite(SPRITE_WIDTH, SPRITE_HEIGHT);
            this.label = new Label(name);
            this.position = position;

            this.move = function(position) {
                var x = nodeData[position][0] * MAP_DOT_WIDTH;
                var y = nodeData[position][1] * MAP_DOT_HEIGHT;
                // move character
                this.character.x = x - this.character.width / 2;
                this.character.y = y - this.character.height * 7 / 8;

                // move label
                this.label.x = this.character.x;
                this.label.y = this.character.y - (this.character.height / 2);

                // update position
                this.position = position;
            }

            // event in one frame
            this.addFlame = function() {
                this.character.frame = (this.character.frame + 1) % 2;
            }

            // constructor
            this.character.image = game.assets[imageFiles['character']];
            this.character.frame = 7;
            scene.addChild(this.character);
            scene.addChild(this.label);
            this.move(position);
        }

        var map = new Map(MAP_DOT_WIDTH, MAP_DOT_HEIGHT);
        map.image = game.assets[imageFiles['map']];

        // initialize map. set background image.
        var map_data = [GAME_WIDTH / MAP_DOT_WIDTH]
        for (var h = 0; h < GAME_HEIGHT / MAP_DOT_HEIGHT; h++) {
            map_data[h] = [GAME_HEIGHT / MAP_DOT_HEIGHT];
            for (var w = 0; w < GAME_WIDTH / MAP_DOT_WIDTH; w ++) {
                map_data[h][w] = 2;
            }
        }

        // set dummy position data.
        for (var i = 0; i < nodeData.length; i++) {
            map_data[nodeData[i][1]][nodeData[i][0]] = 21;
        }

        map.loadData(map_data);
        scene.addChild(map);

        var players = Array();
        var userId;

        socket.on('identify', function(message) {
            userId = message.access_user_id;
            var initial_position = Math.floor(Math.random() * nodeData.length);
            players[userId] = new Player(initial_position, 'you');
            socket.emit('game/move', {
                position: players[userId].position
            });
        });
        socket.emit('ready','');

        game.pushScene(scene);

        // add event to scene
        scene.addEventListener('touchstart', function(e) {
            var position = getPosition(e.x, e.y);
            players[userId].move(position);
            socket.emit('game/move', {
                position: players[userId].position
            });
        });

        scene.addEventListener(Event.ENTER_FRAME, function() {
            for (var id in players) {
                players[id].addFlame();
            }
        });

        socket.on('game/move', function(data) {
            console.log(data);
            for(var id in data) {
                var position = data[id];
                if (typeof(players[id]) == 'undefined') {
                    players[id] = new Player(position, 'player' + userId);
                } else {
                    players[id].move(position);
                }
            }
        });

        function getPosition(x, y) {
            var position = null;
            for (var i = 0; i < nodeData.length; i++) {
                if (nodeData[i][0] * MAP_DOT_WIDTH < x && x < (nodeData[i][0] + 1) * MAP_DOT_WIDTH
                    && nodeData[i][1] * MAP_DOT_HEIGHT < y && y < (nodeData[i][1] + 1) * MAP_DOT_HEIGHT) {
                    position = i;
                }
            }
            return position
        }

    };

    socket.on('connect', function() {
        game.start();
    }); // connect
};
