var Generator = require('./generator');
var DisplayHandler = require('./display_handler');
var Info = require('./info');


class GameEngine {
  constructor(context, player) {
    this.level = 0;
    this.player = player;
    this.displayHandler = new DisplayHandler({context: context});
    this.generator = new Generator(this.displayHandler, this.player);
    this.info = new Info(this);
    this.player.setEngine(this);
    this.firstPass = 0;
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
          exit = generator.generateLevel(56, 40, 5 * game.level, 5, 11, 5 * (game.level / 2), 10 * (game.level / 2), 5 * (game.level / 2));
          levelWon = false;
      } else {
        game.info.updateAttributes();
        dh.draw();
        levelWon = game.checkWinCondition(exit, player);
      }

      requestAnimationFrame(drawLoop);
    });

  }

  gameWon() {
    if (this.firstPass === 0 && this.level === 8) {
      this.firstPass++;
    }
    if (this.firstPass === 1 && this.level === 8) {
      this.firstPass++;
      this.level--;
      this.info.saveScore();
      this.info.displayScore();
      this.level++;
      return true;
    }
    if (this.level === 8) {
      return true;
    } else {
      return false;
    }
  }

  checkWinCondition(exit, player) {
    return (((exit.x === player.position.x) && (exit.y === player.position.y)) && exit.value === -1);
  }

  gameOver() {
    if(this.player.health <= 0){
      this.player.health = 0;
      this.info.updateAttributes();
      return true;
    }
    return false;
  }

}

module.exports = GameEngine;
