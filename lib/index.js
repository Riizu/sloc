var Grid = require('./grid');
var DisplayHandler = require('./display_handler');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = new Grid({width: 56, height: 40});
var displayHandler = new DisplayHandler({context: context, grid: grid});

grid.generateRooms(50, 3, 8);
//grid.getCell(1,1).setValue(2);
//grid.createRoom({x: 2, y: 2, width: 2, height: 2});
//grid.createRoom({x: 5, y: 2, width: 2, height: 2});

requestAnimationFrame(function drawLoop() {
    displayHandler.draw();
    requestAnimationFrame(drawLoop);
});
