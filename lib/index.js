var GameEngine = require('./game-engine');
var Player = require('./player');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var player = new Player();

var gameEngine = new GameEngine(context, player);

gameEngine.play();


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

  if([37, 38, 39, 40].includes(event.which)){
    event.preventDefault();
    gameEngine.generator.grid.enemies.forEach((e => e.chase()));
  }
});
