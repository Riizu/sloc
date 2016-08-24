const assert = require('chai').assert;
const Grid = require('../lib/grid');
const Cell = require('../lib/cell');
const Room = require('../lib/room');

describe('Grid', function () {
  it('should have a 2d array matching its initialized size', function () {
      var data_hash = {
          height: 20,
          width: 20,
      };
      var grid = new Grid(data_hash);

      assert.equal(grid.width, 20);
      assert.equal(grid.height, 20);
      assert.equal(grid.cells instanceof Array, true);
  });

  it('should generate a collection of cells in a 2d array', function () {
      var data_hash = {
          height: 20,
          width: 20,
      };
      var expectedDimensions = [data_hash.height, data_hash.width];
      var grid = new Grid(data_hash);

      var result = grid.generateCells();
      var actualDimensions = [result.length, result[0].length];

      assert.equal(result instanceof Array, true);
      assert.deepEqual(actualDimensions, expectedDimensions);
      assert.equal(result[0][0] instanceof Cell, true);
  });

  it('should get a cell', function () {
      var data_hash = {
          height: 20,
          width: 20,
      };
      var grid = new Grid(data_hash);

      var result = grid.getCell(0, 0);

      assert.equal(result.value, 0);
  });

  it('should pull a collection of cells', function () {
      var data_hash = {
          height: 20,
          width: 20,
      };
      var grid = new Grid(data_hash);
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
      var data_hash= {
          height: 20,
          width: 20,
      };
      var grid = new Grid(data_hash);
      var rooms = grid.rooms;

      assert.deepEqual(rooms, []);  // Should we return an empty array or null 
  });

  // single room

  //create_room
});