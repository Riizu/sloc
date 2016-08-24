const assert = require('chai').assert;
const Grid = require('../lib/grid');
const Cell = require('../lib/cell');
const Room = require('../lib/room');

describe('Room', function () {
    it('should have a corresponding x, y, width, and height', function () {
        var roomData = {
            x: 0,
            y: 0,
            width: 2,
            height: 2
        };

        var room = new Room(roomData);

        assert.equal(room.x, 0);
        assert.equal(room.y, 0);
        assert.equal(room.width, 2);
        assert.equal(room.height, 2);
    });
});
