const assert = require('chai').assert;
const Grid = require('../lib/grid');
const Generator = require('../lib/generator');

describe('Generator', function () {

it('should not generate overlapping rooms', function(){
    var dataHash = {
    height: 20,
    width: 28,
    };
    var grid = new Grid(dataHash);
    var generator = new Generator(grid);    
    grid.createRoom({x: 0, y: 0, width: 28, height: 20});

    assert.equal(grid.rooms.length, 1);
    generator.generateRooms(92, 3, 7);

    assert.equal(grid.rooms.length, 1);
  });
});