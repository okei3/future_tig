Room = require('./room');
describe('room', function () {
    var room;
    beforeEach(function () {
        room = new Room(1, 'my room');
    });
    it('has id', function () {
        expect(room.getId()).toBe(1);
    });
    it('has name', function () {
        expect(room.getName()).toBe('my room');
    });
    it('change name', function () {
        room.setName('your room');
        expect(room.getName()).toBe('your room');
    });
    it('has member', function () {
        room.addMember(1);
        expect(room.hasMember(1)).toBe(true);
    });
    it('remove member', function (){
        room.addMember(1);
        room.removeMember(1);
        expect(room.hasMember(1)).toBe(false);
    });
});
