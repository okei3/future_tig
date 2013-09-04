enchant();

window.onload = function() {
    var core = new Core(320,320);
    core.fps = 12;

    //読み込み
    core.preload('image/chara1.png');

    //プレイヤ固有情報
    var player_id;
    var player_before_x;
    var player_before_y;
    var player_id;
    var distance_sensor;

    //他
    var players = new Array();
    var player_x = new Array();
    var player_y = new Array();
    var mass = new Array();
    var mass_number = new Array();
    var line = new Array();
    var map_data = new Array();
    map_data = [
        [0, 0],
        [0, 50],
        [20, 100],
        [10, 150],
        [30, 220],
        [15, 270],
        [50, 0],
        [50, 50],
        [70, 100],
        [70, 150],
        [100, 200],
        [90, 250],
        [100, 0],
        [100, 50],
        [120, 100],
        [110, 150],
        [130, 220],
        [15, 270],
    ];
    var map_line_data = new Array();
    map_line_data = [
        [0, 1],
        [0, 6],
        [0, 7],
    ];

    //泥棒用
    var thief_id;
    var thief_x = 0;
    var thief_y = 0;

    //クラス
    var Player = Class.create(Sprite, {
        initialize: function(x, y) {
            Sprite.call(this, 32, 32);
            this.image = core.assets['image/chara1.png'];
            this.x = x;
            this.y = y;
        }
    });

    var Box = Class.create(Sprite, {
        initialize: function(x, y) {
            Sprite.call (this, 320, 320);
            var canvas_surface = new Surface(320, 320);
            canvas_surface.context.beginPath();
            canvas_surface.context.fillStyle = "green";
            canvas_surface.context.fillRect(x, y, 32, 32);
            this.image = canvas_surface;
        }
    });

    var Line = Class.create(Sprite, {
        initialize: function(x, y, x2, y2) {
            Sprite.call (this, 320, 320);
            var canvas_surface = new Surface(320, 320);

            canvas_surface.context.beginPath();
            canvas_surface.context.strokeStyle = "black";

            canvas_surface.context.moveTo(x, y);
            canvas_surface.context.lineTo(x2, y2);
            canvas_surface.context.closePath();
            canvas_surface.context.stroke();;
            this.image = canvas_surface;
        }
    });

    var RedLine = Class.create(Sprite, {
        initialize: function(x, y, x2, y2) {
            Sprite.call (this, 320, 320);
            var canvas_surface = new Surface(320, 320);

            canvas_surface.context.beginPath();
            canvas_surface.context.strokeStyle = "red";

            canvas_surface.context.moveTo(x, y);
            canvas_surface.context.lineTo(x2, y2);
            canvas_surface.context.closePath();
            canvas_surface.context.stroke();;
            this.image = canvas_surface;
        }
    });

    var BlueLine = Class.create(Sprite, {
        initialize: function(x, y, x2, y2) {
            Sprite.call (this, 320, 320);
            var canvas_surface = new Surface(320, 320);

            canvas_surface.context.beginPath();
            canvas_surface.context.strokeStyle = "blue";

            canvas_surface.context.moveTo(x, y);
            canvas_surface.context.lineTo(x2, y2);
            canvas_surface.context.closePath();
            canvas_surface.context.stroke();;
            this.image = canvas_surface;
        }
    });

    var TextLabel = Class.create(Label, {
        initialize: function(x, y, moji) {
            Label.call (this);
            this.x = x;
            this.y = y;
            this.color = 'red';
            this.font = '32px "Arial"';
            this.text = moji;
        }
    });

    //ゲーム起動画面
    core.onload = function() {
        start_scene = new Scene();
        var player1 = Player(0, 0);

        //socket
        socket.emit('game play','test');
        socket.on('game play', function (msg) {
            console.log(msg);
            player_id = msg;
        });

        //playerのイベント
        player1.addEventListener('enterframe', function() {
            player1.frame = this.age % 3;
        });

        player1.addEventListener('touchstart',function() {
            start_group.removeChild(player1);
            core.pushScene(game_main(this));
        });

        var start_group = new Group();
        core.rootScene.addChild(start_group);
        start_group.addChild(player1);
    }
    core.start();

    //Scene
    var game_main = function() {
        game_scene = new Scene();
        players[player_id] = Player(0, 0);
        distance_chara = Player(280, 280);

        //playerイベント
        players[player_id].addEventListener('enterframe', function() {
            if(core.input.right){
                game_group.x -= 5;
            }

            if(core.input.left){
                game_group.x += 5;
            }
            if(core.input.up){
                game_group.y += 5;
            }
            if(core.input.down){
                game_group.y -= 5;
            }
            //player参加イベント
            socket.on('player sync push', function (player_info) {
                if(players[player_info.id]) {
                    players[player_info.id].x =  player_info.x;
                    players[player_info.id].y =  player_info.y;
                    players[player_info.id].opacity = 1.0;
                    if((player_info.id == thief_id) ) {
                        thief_x = player_info.x;
                        thief_y = player_info.y;
                        players[player_info.id].opacity = 0.0;
                    }
                } else {
                    players[player_info.id] = Player(0, 0);
                    game_group.addChild(players[player_info.id]);
                }
            });

            //キーバインド
            core.keybind(90, "z");
            if(core.input.z) {
                socket.emit('thief send',player_id);
            }
            socket.on('thief push', function (msg) {
                thief_id = msg;
                console.log(thief_id);
            });

            this.frame = this.age % 3 + 5;
            if((player_before_x != this.x) && (player_before_y != this.y)) {
                socket.emit('player sync send',{id: player_id, x:this.x, y:this.y});
            };

            player_before_x = this.x;
            player_before_y = this.y;
        });
        //センサー
        distance_chara.addEventListener('enterframe', function() {
            this.opacity = 0.0;
            if(distance_sensor < 100) {
                this.scaleX = 5;
                this.scaleY = 5;
                this.scale(2,3);
                this.opacity = 1.0;
                distance_d = (100 - distance_sensor) / 25;
                //this.scale(distance_d, distance_d)
                //console.log(distance_d)
            }
        });

        core.rootScene.addEventListener('touchstart',function(e) {
                players[player_id].x = e.x;
                players[player_id].y = e.y;
                console.log('e.x' + e.x);
                console.log('e.y' + e.y);
                //game_group.x -= e.x;
                //game_group.y -= e.y;
                console.log('game_group.x' + game_group.x);
                console.log('game_group.y' + game_group.y);
                x_d = e.x - thief_x;
                y_d = e.y - thief_y;
                distance_sensor = Math.sqrt(Math.pow(x_d,2) + Math.pow(y_d,2))
        });

        var game_group = new Group();
        core.rootScene.addChild(game_group);
        //game_group.addChild(players[player_id]);

        //ステージ生成
        for (var loop=0; loop<map_data.length; loop++) {
        //for (var loop=0; loop<2; loop++) {
            mass[loop] = new Box(map_data[loop][0], map_data[loop][1]);
            mass_number[loop] = new TextLabel(map_data[loop][0], map_data[loop][1], loop);
            mass[loop].addEventListener('touchstart',function(e) {
                players[player_id].x = mass[loop].x;
                players[player_id].y = mass[loop].y;
        });
            game_group.addChild(mass[loop]);
            game_group.addChild(mass_number[loop]);
        }

        for (var loop_line=0; loop_line<map_line_data.length; loop_line++) {
            line[loop_line] = new Line(map_data[map_line_data[loop_line][0]][0], map_data[map_line_data[loop_line][0]][1], map_data[map_line_data[loop_line][1]][0], map_data[map_line_data[loop_line][1]][1]);
            game_group.addChild(line[loop_line]);
        }
        //プレイヤー描画
        core.rootScene.addChild(players[player_id]);

        //センサー
        //core.rootScene.addChild(distance_chara);
    };
};//window.onload
