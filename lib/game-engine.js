var Generator = require('./generator');
var DisplayHandler = require('./display_handler');
var Camera = require('./camera');
var Info = require('./info');
var Player = require('./player');

class GameEngine {
  constructor(context) {
    this.level = 0;
    this.player = new Player();
    this.displayHandler = new DisplayHandler({context: context});
    this.generator = new Generator(this.displayHandler, this.player);
    this.camera = new Camera(this);
    this.info = new Info(this);
    this.player.setEngine(this);
    this.firstPass = 0;
    this.notStarted = true;
    this.levelWon = true;
  }

  startGame() {
    if(this.notStarted) {
      this.notStarted = false;
    } else if(this.notStarted === false && this.gameOver()) {
      this.player.health = 10;
      this.player.score = 0;
      this.level = 0;
      this.firstPass = 0;
      this.levelWon = true;
    } else if(this.notStarted === false && this.gameWon()) {
      this.level = 9;
      this.firstPass = 0;
      this.levelWon = true;
    }
  }

  play() {
    var exit = null;
    var generator = this.generator;
    var dh = this.displayHandler;
    var player = this.player;
    var game = this;

    requestAnimationFrame(function drawLoop() {
      if (game.notStarted) {
        dh.drawStartSplash();
      } else if (game.levelWon) {
          game.level++;
          dh.setCamera(game.camera);
          exit = generator.generateLevel(Math.round(56 * (game.level / 2)), Math.round(40 * (game.level / 2)), 10 * game.level, 5 + game.level, 11 + game.level, 5 * game.level, 10 * (game.level / 2), 5 * (game.level / 2));
          game.levelWon = false;
      } else if (game.gameWon()) {
        dh.drawGameWon();
      } else if (game.gameOver()) {
        dh.drawGameOver();
      }  else {
        game.info.updateAttributes();
        game.camera.update();
        dh.draw();
        game.levelWon = game.checkWinCondition(exit, player);
      }

      requestAnimationFrame(drawLoop);
    });

  }

  gameWon() {
    if (this.firstPass === 0 && this.level === 8) {
      this.firstPass++;
    }
    if (this.firstPass === 1 && this.level >= 8) {
      this.firstPass++;
      this.level--;
      this.info.saveScore();
      this.info.displayScore();
      this.level++;
      return true;
    }
    if (this.level === 8) {
      return true;
    } else if(this.level === 9) {
      this.level = 8;
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
