var Player = require('./player');
var Grid = require('./grid');
var Generator = require('./generator');
var DisplayHandler = require('./display_handler');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var player = new Player();
var grid = new Grid({width: 56, height: 40});
var generator = new Generator(grid, player);
var displayHandler = new DisplayHandler({context: context, grid: grid});

generator.generateRooms(500, 7, 5);
//generator.generateMazes();
generator.generateCorridors();
generator.generatePlayer();

requestAnimationFrame(function drawLoop() {
    displayHandler.draw();
    requestAnimationFrame(drawLoop);
});
