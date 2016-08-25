var Grid = require('./grid');
var DisplayHandler = require('./display_handler');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = new Grid({width: 56, height: 40});
var displayHandler = new DisplayHandler({context: context, grid: grid});

grid.createRoom({x: 2, y: 5, width: 12, height: 9});
grid.createRoom({x: 15, y: 12, width: 12, height: 9});
grid.getCell(1,1).setValue(2);

requestAnimationFrame(function drawLoop() {
    displayHandler.draw();
    requestAnimationFrame(drawLoop);
});