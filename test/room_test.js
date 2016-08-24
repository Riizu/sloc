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

    it('should have a collection of cells', function () {
        var roomData = {
            x: 0,
            y: 0,
            width: 2,
            height: 2
        };
        var room = new Room(roomData);
        var expectedDimensions = [2, 2];
        var actualDimensions = [room.cells.length, room.cells[0].length];

        assert.deepEqual(actualDimensions, expectedDimensions);
        assert.equal(room.cells[0][0] instanceof Cell, true);
    });

    it('should be able to get one of its cells', function () {
        var roomData = {
            x: 0,
            y: 0,
            width: 2,
            height: 2
        };
        var room = new Room(roomData);

        var result = room.getCell(0, 0);

        assert.equal(result.value, 0);
    });
});
