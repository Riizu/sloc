var Generator = require('./generator');
var DisplayHandler = require('./display_handler');
var Camera = require('./camera');
var Info = require('./info');

class GameEngine {
  constructor(context, player) {
    this.level = 0;
    this.player = player;
    this.displayHandler = new DisplayHandler({context: context});
    this.generator = new Generator(this.displayHandler, this.player);
    this.camera = new Camera(this);
    this.info = new Info(this);
    this.player.setEngine(this);
    this.firstPass = 0;
    this.notStarted = true;
  }

  play() {
    var levelWon = true;
    var exit = null;
    var generator = this.generator;
    var dh = this.displayHandler;
    var player = this.player;
    var game = this;

    requestAnimationFrame(function drawLoop() {
      if (game.notStarted) {
        dh.drawStartSplash();
      }else if (game.gameWon()) {
        dh.drawGameWon();
      } else if (game.gameOver()) {
        dh.drawGameOver();
      } else if (levelWon) {
          game.level++;
          dh.setCamera(game.camera);
          exit = generator.generateLevel(Math.round(56 * (game.level / 2)), Math.round(40 * (game.level / 2)), 10 * game.level, 5 + game.level, 11 + game.level, 5 * game.level, 10 * (game.level / 2), 5 * (game.level / 2));
          levelWon = false;
      } else {
        game.info.updateAttributes();
        game.camera.update();
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
