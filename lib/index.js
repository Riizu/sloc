var GameEngine = require('./game-engine');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var gameEngine = new GameEngine(context);

gameEngine.play();


window.addEventListener( "keydown", function(event) {
  switch (event.which) {
      case 32:
          gameEngine.startGame();
          break;
      case 37:
          gameEngine.player.moveLeft();
          break;
      case 38:
          gameEngine.player.moveUp();
          break;
      case 39:
          gameEngine.player.moveRight();
          break;
      case 40:
          gameEngine.player.moveDown();
          break;
  }

  if([37, 38, 39, 40].includes(event.which)){
    event.preventDefault();
    gameEngine.generator.grid.enemies.forEach((e => e.chase()));
  }
});
