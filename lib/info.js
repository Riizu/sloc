class Info {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
  }

  updateAttributes() {
    document.getElementById("health").innerHTML = "Player Health: " + this.gameEngine.player.health;
    document.getElementById("level").innerHTML = "Floor: " + this.gameEngine.level;
    document.getElementById("score").innerHTML = "Score: " + this.gameEngine.player.score;
  }
}

module.exports = Info;
