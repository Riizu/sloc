var Generator = require('./generator');
var DisplayHandler = require('./display_handler');
var Camera = require('./camera');


class GameEngine {
  constructor(context, player) {
    this.level = 0;
    this.player = player;
    this.displayHandler = new DisplayHandler({context: context});
    this.generator = new Generator(this.displayHandler, this.player);
    this.camera = new Camera(this);
  }

  play() {
    var levelWon = true;
    var exit = null;
    var generator = this.generator;
    var dh = this.displayHandler;
    var player = this.player;
    var game = this;

    requestAnimationFrame(function drawLoop() {
      if (game.gameWon()) {
        dh.drawGameWon();
      } else if (game.gameOver()) {
        dh.drawGameOver();
      } else if (levelWon) {
          game.level++;
          exit = generator.generateLevel(560, 400, 20 * game.level, 5 + game.level, 11 + game.level, 5 * game.level, 10 * game.level, 5 * game.level);
          dh.setCamera(game.camera);
          levelWon = false;
      } else {
        game.camera.update();
        dh.draw();
        levelWon = game.checkWinCondition(exit, player);
      }

      requestAnimationFrame(drawLoop);
    });

  }

  gameWon() {
    return this.level === 8;
  }

  checkWinCondition(exit, player) {
    return (((exit.x === player.position.x) && (exit.y === player.position.y)) && exit.value === -1);
  }

  gameOver() {
    return this.player.health === 0;
  }
}

module.exports = GameEngine;
