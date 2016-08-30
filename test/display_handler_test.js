const assert = require('chai').assert;
var Grid = require('../lib/grid');
var DisplayHandler = require('../lib/display_handler');

describe('DisplayHandler', function () {
    it("should be initialized with a canvas", function() {
        var context = "dummy context";
        var dh = new DisplayHandler({context: context});

        assert.equal(dh.context, context);
    });
});
