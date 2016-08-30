const assert = require('chai').assert;
const Grid = require('../lib/grid');
const Generator = require('../lib/generator');
const Player = require('../lib/player')
const DisplayHandler = require('../lib/display_handler')

describe('Generator', function () {

  it('should not generate overlapping rooms', function(){
    var player = new Player();
    var displayHandler = new DisplayHandler({context: context});
    var generator = new Generator(displayHandler, player);
    // grid.createRoom({x: 0, y: 0, width: 28, height: 20});

    // assert.equal(grid.rooms.length, 1);
    // generator.generateLevel(92, 3, 7);

    generator.generateLevel(28, 28, 10, 20, 20, 10)

    assert.equal(generator.grid.rooms.length, 1);
  });
});
