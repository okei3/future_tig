Map = require('./map');
describe('game', function () {
    var map = new Map();
    it('can move', function () {
        expect(map.canMove(1, 0)).toBe(true);
        expect(map.canMove(3, 2)).toBe(false);
    });
});
