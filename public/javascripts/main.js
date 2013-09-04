enchant();

window.onload = function() {
    var socket = io.connect(location.origin);
    var core = new Core(320,320);
    core.fps = 12;

    //読み込み
    core.preload('image/chara1.png');

    //プレイヤー
    var Player = Class.create(Sprite, {
        initialize: function(x, y) {
            Sprite.call(this, 32, 32);
            this.image = core.assets['image/chara1.png'];
            this.x = x;
            this.y = y;
        }
    });

    //文字列生成
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

//**********************************************************
//スタートページ

    core.onload = function() {
        start_scene = new Scene();
        var guide = Player(0, 0);

        //socket
        socket.emit('game play', socket.id);
        socket.on('game prepare', function (sid) {
            //一時対応、socketで個人指定できるようになったら修正
            if(!player_id) {
                player_id = sid;
            }
        });

        //guideのイベント
        guide.addEventListener('enterframe', function() {
            guide.frame = this.age % 3;
        });

        guide.addEventListener('touchstart',function() {
            if(player_id) {
                start_group.removeChild(guide);
                core.pushScene(game_main(this));
            }
        });

        //画面出力
        var start_group = new Group();
        core.rootScene.addChild(start_group);
        start_group.addChild(guide);
    }
    core.start();

//**********************************************************
//ゲーム画面
    var game_main = function() {
        game_scene = new Scene();
        players[player_id] = Player(0, 0);
        distance_chara = Player(280, 280);

        //playerイベント
        players[player_id].addEventListener('enterframe', function() {

            controll(core,game_group);

            //player参加
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

            this.frame = this.age % 3 + 5;
            if((player_before_x != this.x) && (player_before_y != this.y)) {
                var player_data = new Array(player_id,this.x,this.y);
                //socket.emit('player sync send',player_data);
                console.log(player_id);
                socket.emit('player sync send',{"id":player_id, "x":this.x, "y":this.y});
            };

            player_before_x = this.x;
            player_before_y = this.y;

            //泥棒用
            core.keybind(90, "z");
            if(core.input.z) {
                socket.emit('thief send',player_id);
            }
            socket.on('thief push', function (msg) {
                thief_id = msg;
            });
        });

         core.rootScene.addEventListener('touchstart',function(e) {
                players[player_id].x = e.x;
                players[player_id].y = e.y;
                //game_group.x -= e.x;
                //game_group.y -= e.y;
                console.log('game_group.x' + game_group.x);
                console.log('game_group.y' + game_group.y);
                x_d = e.x - thief_x;
                y_d = e.y - thief_y;
                distance_sensor = Math.sqrt(Math.pow(x_d,2) + Math.pow(y_d,2))
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

        //画面表示
        var game_group = new Group();
        core.rootScene.addChild(game_group);

        //ステージ生成
        for (var loop=0; loop<map_data.length; loop++) {
        //for (var loop=0; loop<2; loop++) {
            mass[loop] = new Box(map_data[loop][0], map_data[loop][1]);
            mass_number[loop] = new TextLabel(map_data[loop][0], map_data[loop][1], loop);
            //うまくうごかない
            mass_number[loop].addEventListener('touchstart',function() {
                console.log("kiteru");
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

//**********************************************************
//関数など外部ファイル予定
    function controll(obj_core,obj){

        if(obj_core.input.right){
            obj.x -= 5;
        }

        if(obj_core.input.left){
            obj.x += 5;
        }
        if(obj_core.input.up){
            obj.y += 5;
        }
        if(obj_core.input.down){
            obj.y -= 5;
        }
    };
};//window.onload
