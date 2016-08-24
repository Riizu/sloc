const assert = require('chai').assert;
const Cell = require('../lib/cell');

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
});
