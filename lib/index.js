var Player = require('./player');
var Generator = require('./generator');
var DisplayHandler = require('./display_handler');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var player = new Player();
var displayHandler = new DisplayHandler({context: context});
var generator = new Generator(displayHandler, player);
var won = true;
var exit = null;

requestAnimationFrame(function drawLoop() {
  if(won) {
    exit = generator.generateLevel(56, 40, 20, 5, 11, 5, 10);
    won = false;
  } else {
    displayHandler.draw();
    won = checkWinCondition(exit, player);
  }

  requestAnimationFrame(drawLoop);
});

function checkWinCondition(exit, player) {
  return (((exit.x == player.position.x) && (exit.y == player.position.y)) && exit.value === -1);
}

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
