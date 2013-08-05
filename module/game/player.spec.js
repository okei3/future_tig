Player = require('./player');
Map = require('./map');
describe('game', function () {
    var player = new Player(1);
    var map = new Map();
    it('move', function () {
        expect(player.move(1, map)).toBe(true);
        expect(player.position).toBe(1);
        expect(player.move(1, map)).toBe(false);
        expect(player.position).toBe(1);
        expect(player.move(3, map)).toBe(true);
        expect(player.position).toBe(3);
        expect(player.move(2, map)).toBe(false);
        expect(player.position).toBe(3);
    });
});
