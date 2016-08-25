const assert = require('chai').assert;
const Grid = require('../lib/grid');
const Cell = require('../lib/cell');
const Room = require('../lib/room');

describe('Grid', function () {
  it('should have a 2d array matching its initialized size', function () {
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);

      assert.equal(grid.width, dataHash.width);
      assert.equal(grid.height, dataHash.height);
      assert.equal(grid.cellArray instanceof Array, true);
  });

  it('should generate a collection of cells in a 2d array', function () {
      var dataHash = {
          height: 20,
          width: 28,
      };
      var expectedDimensions = [dataHash.height, dataHash.width];
      var grid = new Grid(dataHash);

      var result = grid.generateCells();
      var actualDimensions = [result.length, result[0].length];

      assert.equal(result instanceof Array, true);
      assert.deepEqual(actualDimensions, expectedDimensions);
      assert.equal(result[0][0] instanceof Cell, true);
  });

  it('should get a cell', function () {
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);

      var result = grid.getCell(0, 0);

      assert.equal(result.value, 0);
  });

  it('should pull a collection of cells', function () {
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.getCell(0,0).setValue(1);
      var results = grid.pullCells(0, 0, 2, 2);
      var targetedCell = results.find(function(cell) {
          return cell.x === 0 && cell.y === 0;
      });

      assert.equal(results.length, 4);
      assert.equal(targetedCell.value, 1);
  });

  it('should pull all rooms in the grid when no rooms are present', function(){
      var dataHash= {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      var rooms = grid.rooms;

      assert.deepEqual(rooms, []);  // Should we return an empty array or null
  });

  it('should pull all rooms in the grid when rooms are present', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);

      assert.deepEqual(grid.rooms, []);

      grid.createRoom({x: 0, y: 0, height: 2, width: 2});
      assert.deepEqual(grid.rooms.length, 1);
  });

  it('should find a specific room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);

      grid.createRoom({x: 0, y: 0, height: 2, width: 2});
      var expectedRoom = grid.createRoom({x: 5, y: 5, height: 2, width: 2});
      grid.createRoom({x: 10, y: 10, height: 2, width: 2});
      var room = grid.findRoom(5, 5);

      assert.equal(room, expectedRoom);
  });

  it('should create a room on the grid', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      var roomInfo = {
          x: 0,
          y: 0,
          height: 5,
          width: 12,
      };
      var room = grid.createRoom(roomInfo);

      assert.equal(room instanceof Room, true);
  });

  it('should determine if a space is currently not occupied by a room', function() {
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);

      var result = grid.isNotOccupied(2, 3, 2, 2);

      assert.equal(result, true);
      assert.equal(grid.rooms.length, 0);
  });

  it('should determine if a space completely overlaps another room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 2, y: 3, width: 4, height: 4});

      var result = grid.isNotOccupied(2, 3, 4, 4);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 1);
  });

  it('should determine if a space overlaps the upper left corner of another room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 2, y: 3, width: 4, height: 4});

      var result = grid.isNotOccupied(1, 2, 2, 2);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 1);
  });

  it('should determine if a space overlaps the upper right corner of another room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 2, y: 3, width: 4, height: 4});

      var result = grid.isNotOccupied(5, 2, 2, 2);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 1);
  });

  it('should determine if a space overlaps the bottom left corner of another room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 2, y: 3, width: 4, height: 4});

      var result = grid.isNotOccupied(1, 6, 2, 2);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 1);
  });

  it('should determine if a space overlaps the bottom right corner of another room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 2, y: 3, width: 4, height: 4});

      var result = grid.isNotOccupied(5, 6, 2, 2);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 1);
  });

  it('should determine if a space overlaps the top of another room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 2, y: 3, width: 4, height: 4});

      var result = grid.isNotOccupied(2, 2, 4, 2);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 1);
  });

  it('should determine if a space overlaps the bottom of another room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 2, y: 3, width: 4, height: 4});

      var result = grid.isNotOccupied(2, 6, 4, 2);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 1);
  });

  it('should determine if a space overlaps the left side of another room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 2, y: 3, width: 4, height: 4});

      var result = grid.isNotOccupied(1, 3, 2, 4);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 1);
  });

  it('should determine if a space overlaps the right side of another room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 2, y: 3, width: 4, height: 4});

      var result = grid.isNotOccupied(5, 3, 2, 4);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 1);
  });

  it('should determine if a space is within a room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 0, y: 0, width: 28, height: 20});

      var result = grid.isNotOccupied(5, 3, 2, 4);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 1);
  });

  it('should determine if a space is contains a room', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 2, y: 2, width: 4, height: 4});

      var result = grid.isNotOccupied(1, 1, 5, 5);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 1);
  });

  it('should determine if a space overlaps two rooms', function(){
      var dataHash = {
          height: 20,
          width: 28,
      };
      var grid = new Grid(dataHash);
      grid.createRoom({x: 2, y: 2, width: 2, height: 2});
      grid.createRoom({x: 5, y: 2, width: 2, height: 2});

      var result = grid.isNotOccupied(3, 2, 4, 2);

      assert.equal(result, false);
      assert.equal(grid.rooms.length, 2);
  });


  it('should not generate overlapping rooms', function(){
    var dataHash = {
      height: 20,
      width: 28,
    };
    var grid = new Grid(dataHash);
    grid.createRoom({x: 0, y: 0, width: 28, height: 20});

    assert.equal(grid.rooms.length, 1);
    grid.generateRooms(92, 3, 7);

    assert.equal(grid.rooms.length, 1);
  })
});
