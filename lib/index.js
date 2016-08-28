var Grid = require('./grid');
var Generator = require('./generator');
var DisplayHandler = require('./display_handler');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = new Grid({width: 56, height: 40});
var generator = new Generator(grid);
var displayHandler = new DisplayHandler({context: context, grid: grid});

generator.generateRooms(500, 7, 5);
//generator.generateMazes();
generator.generateCorridors();

requestAnimationFrame(function drawLoop() {
    displayHandler.draw();
    requestAnimationFrame(drawLoop);
});
