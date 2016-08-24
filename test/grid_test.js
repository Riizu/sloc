const assert = require('chai').assert;
const Grid = require('../lib/grid');
const Cell = require('../lib/cell');

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

  it.skip('should get a cell', function () {
      var grid = new Grid(20, 20);
      var x = 0;
      var y = 0;
      var result = grid.getCell(x, y);
      assert.equal(result, 0);
  });
});