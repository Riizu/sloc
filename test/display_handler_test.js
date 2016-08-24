const assert = require('chai').assert;
var Grid = require('../lib/grid');
var DisplayHandler = require('../lib/display_handler');

describe('DisplayHandler', function () {
    it("should be initialized with a grid and a canvas", function() {
        var canvas = "dummy canvas";
        var grid = new Grid({width: 20, height: 20});
        var dh = new DisplayHandler({grid: grid, canvas: canvas});

        assert.equal(dh.canvas, canvas);
        assert.equal(dh.grid, grid);
    });
});