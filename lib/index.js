var Player = require('./player');
var Grid = require('./grid');
var Generator = require('./generator');
var DisplayHandler = require('./display_handler');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = new Grid({width: 56, height: 40});
var player = new Player(grid);
var generator = new Generator(grid, player);
var displayHandler = new DisplayHandler({context: context, grid: grid});

// grid.cells.forEach(function(cell) {
//   console.log(cell.x + '|' + cell.y);
// });

generator.generateRooms(500, 7, 5);
//generator.generateMazes();
generator.generateCorridors();
generator.generatePlayer();

console.log(grid.cells.length)


requestAnimationFrame(function drawLoop() {
    displayHandler.draw();
    requestAnimationFrame(drawLoop);
});


window.addEventListener( "keydown", function(event) {
  switch (event.which) {
      case 37:
          player.moveLeft();
          break;
      case 38:
          player.moveUp();
          break;
      case 39:
          player.moveRight();
          break;
      case 40:
          player.moveDown();
          break;
  }
});
