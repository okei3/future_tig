Game = require('./game');
Map = require('./map');
Repository = require('./repository');
describe('repository', function () {
    var repository = new Repository();
    beforeEach(function () {
        var map = new Map();
        repository.store(new Game([1,2,3],map));
        repository.store(new Game([4,5,6],map));
    });
    it('resolve', function () {
        var game1 = repository.resolveByUserId(1);
        expect(game1.players[0].id).toBe(1);
        expect(game1.players[1].id).toBe(2);
        expect(game1.players[2].id).toBe(3);
        var game2 = repository.resolveByUserId(4);
        expect(game2.players[0].id).toBe(4);
        expect(game2.players[1].id).toBe(5);
        expect(game2.players[2].id).toBe(6);
        expect(repository.resolveByUserId(7)).toBe(false);
    });
    it('delete', function () {
        expect(repository.deleteByUserId(1)).toBe(true);
        expect(repository.resolveByUserId(1)).toBe(false);
        expect(repository.resolveByUserId(2)).not.toBe(false);
        expect(repository.resolveByUserId(7)).toBe(false);
    });
});
