const assert = require('chai').assert;
var Grid = require('../lib/grid');
var DisplayHandler = require('../lib/display_handler');

describe('DisplayHandler', function () {
    it("should be initialized with a grid and a canvas", function() {
        var context = "dummy context";
        var grid = new Grid({width: 28, height: 20});
        var dh = new DisplayHandler({grid: grid, context: context});

        assert.equal(dh.context, context);
        assert.equal(dh.grid, grid);
    });
});