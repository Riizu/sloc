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
            height: 2,
            grid: new Grid({height: 20, width: 28}),
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
            height: 2,
            grid: new Grid({height: 20, width: 28}),
        };
        var room = new Room(roomData);
        var expectedSize = 4;
        var actualSize = room.cells.length;

        assert.deepEqual(actualSize, expectedSize);
        assert.equal(room.cells[0] instanceof Cell, true);
    });

    it('should be able to get one of its cells', function () {
        var roomData = {
            x: 0,
            y: 0,
            width: 2,
            height: 2,
            grid: new Grid({height: 20, width: 28}),
        };
        var room = new Room(roomData);

        var result = room.getCell(0, 0);

        assert.equal(result.value, 2);
    });

    it('should have a collection of cells that correspond to the exisiting grid', function () {
        var roomData = {
            x: 0,
            y: 0,
            width: 2,
            height: 2,
            grid: new Grid({height: 20, width: 28}),
        };
        var room = new Room(roomData);
        var targetCell = room.getCell(0,0);
        room.grid.getCell(0,0).setValue(2);

        assert.equal(targetCell.value, 2);
    });

    it('should assign itself to its cells', function () {
        var roomData = {
            x: 0,
            y: 0,
            width: 2,
            height: 2,
            grid: new Grid({height: 20, width: 28}),
        };
        var room = new Room(roomData);

        var result = room.getCell(0, 0).room;

        assert.equal(result, room);
    });
});
