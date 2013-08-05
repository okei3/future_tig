Game = require('./game');
Map = require('./map');
describe('game', function () {
    var game;
    beforeEach(function () {
        var map = new Map();
        game = new Game([1,2,3],map);
    });
    it('change turn', function () {
        game.changeTurn();
        expect(game.turn).toBe(1);
    });
});
