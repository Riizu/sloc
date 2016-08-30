var Generator = require('./generator');
var DisplayHandler = require('./display_handler');


class GameEngine {
  constructor(context, player) {
    this.level = 0;
    this.player = player;
    this.displayHandler = new DisplayHandler({context: context});
    this.generator = new Generator(this.displayHandler, this.player);
  }

  play() {
    var won = true;
    var exit = null;
    var generator = this.generator;
    var dh = this.displayHandler;
    var player = this.player;
    var game = this;

    requestAnimationFrame(function drawLoop() {
      if(won) {
        exit = generator.generateLevel(56, 40, 20, 5, 11, 5, 10);
        won = false;
      } else if (game.gameOver()) {
        dh.drawGameOver();
      } else {
        dh.draw();
        won = game.checkWinCondition(exit, player);
      }

      requestAnimationFrame(drawLoop);
    });

  }

  checkWinCondition(exit, player) {
    return (((exit.x === player.position.x) && (exit.y === player.position.y)) && exit.value === -1);
  }

  gameOver() {
    return this.player.health === 0;
  }

}

module.exports = GameEngine;
