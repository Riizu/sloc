const assert = require('chai').assert;
const Cell = require('../lib/cell');
const Grid = require('../lib/grid');

describe('Cell', function () {
    it('should have a default value', function () {
        var cell_data = {
            x: 0,
            y: 2,
            value: 1,
        };

        var cell = new Cell(cell_data);

        assert.equal(cell.x, 0);
        assert.equal(cell.y, 2);
        assert.equal(cell.value, 1);
    });

    it('should have a settable value', function () {
        var cell_data = {
            x: 0,
            y: 2,
            value: 1,
        };

        var cell = new Cell(cell_data);

        assert.equal(cell.value, 1);

        var updatedCell = cell.setValue(2);

        assert.equal(updatedCell.value, 2);
    });

    it('should determine it has zero neighbors if not solid cells are at its cardinal directions', function () {
        var grid = new Grid({width: 3, height: 3});
        var testCell = grid.getCell(1, 1);

        var numNeighbors = testCell.hasNeighbors(['north', 'south', 'east', 'west']);

        assert.equal(numNeighbors, false);
    });

    it('should determine it has one neighbor if a single solid cell is north of it', function () {
        var grid = new Grid({width: 3, height: 3});
        grid.getCell(1, 0).setValue(1);
        var testCell = grid.getCell(1, 1);

        var numNeighbors = testCell.hasNeighbors(['north', 'south', 'east', 'west']);

        assert.equal(numNeighbors, true);
    });

    it('should determine it has one neighbor if a single solid cell is south of it', function () {
        var grid = new Grid({width: 3, height: 3});
        grid.getCell(1, 2).setValue(1);
        var testCell = grid.getCell(1, 1);

        var numNeighbors = testCell.hasNeighbors(['north', 'south', 'east', 'west']);

        assert.equal(numNeighbors, true);
    });

    it('should determine it has one neighbor if a single solid cell is west of it', function () {
        var grid = new Grid({width: 3, height: 3});
        grid.getCell(0, 1).setValue(1);
        var testCell = grid.getCell(1, 1);

        var numNeighbors = testCell.hasNeighbors(['north', 'south', 'east', 'west']);

        assert.equal(numNeighbors, true);
    });

    it('should determine it has one neighbor if a single solid cell is east of it', function () {
        var grid = new Grid({width: 3, height: 3});
        grid.getCell(2, 1).setValue(1);
        var testCell = grid.getCell(1, 1);

        var numNeighbors = testCell.hasNeighbors(['north', 'south', 'east', 'west']);

        assert.equal(numNeighbors, true);
    });
});
