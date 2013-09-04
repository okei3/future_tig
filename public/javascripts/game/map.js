enchant();
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

