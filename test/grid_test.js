const assert = require('chai').assert;
const Grid = require('../lib/grid');
const Cell = require('../lib/cell');
const Room = require('../lib/room');

describe('Grid', function () {
  it('should have a 2d array matching its initialized size', function () {
      var dataHash = {
          height: 20,
          width: 20,
      };
      var grid = new Grid(dataHash);

      assert.equal(grid.width, 20);
      assert.equal(grid.height, 20);
      assert.equal(grid.cells instanceof Array, true);
  });

  it('should generate a collection of cells in a 2d array', function () {
      var dataHash = {
          height: 20,
          width: 20,
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
          width: 20,
      };
      var grid = new Grid(dataHash);

      var result = grid.getCell(0, 0);

      assert.equal(result.value, 0);
  });

  it('should pull a collection of cells', function () {
      var dataHash = {
          height: 20,
          width: 20,
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

  //rooms
  it('should pull all rooms in the grid when no rooms are present', function(){
      var dataHash= {
          height: 20,
          width: 20,
      };
      var grid = new Grid(dataHash);
      var rooms = grid.rooms;

      assert.deepEqual(rooms, []);  // Should we return an empty array or null 
  });

  it.skip('should pull all rooms in the grid when rooms are present', function(){

  });

  // single room

  //create_room
  it('should create a room on the grid', function(){
      var dataHash = {
          height: 20,
          width: 20,
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
});