const assert = require('chai').assert;
const Grid = require('../lib/grid');

describe('Grid', function () {
  it('should have a 2d array matching its initialized size', function () {
      var data_hash = {
          height: 20,
          width: 20,
      };
      var grid = new Grid(data_hash);

      assert.equal(grid.width, 20);
      assert.equal(grid.height, 20);
  });

  it.skip('should set a value for a cell', function () {
      var grid = new Grid(20, 20);
      var x = 0;
      var y = 0;
      var value = 1;
      var expectedResult = {
          x: 0,
          y: 0,
          value: 1,
      };
      
      grid.setCell(x, y, value);

      assert.equal(expectedResult, 1);
  });

  it.skip('should get a cell', function () {
      var grid = new Grid(20, 20);
      var x = 0;
      var y = 0;
      var result = grid.getCell(x, y);
      assert.equal(result, 0);
  });

    it.skip('should get a changed value for a cell', function () {
      var grid = new Grid(20, 20);
      var x = 0;
      var y = 0;

      var currentCellValue = grid.getCell(x, y);
      assert.equal(currentCellValue, 0);
      
      grid.setCell(x, y, 1);
      var newCellValue = grid.getCell(x, y);

      assert.equal(newCellValue, 1);
  });
});