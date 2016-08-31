class Info {
  constructor(gameEngine) {
    this.game = gameEngine;
  }

  updateAttributes() {
    document.getElementById("health").innerHTML = "Player Health: " + this.game.player.health;
    document.getElementById("level").innerHTML = "Floor: " + this.game.level;
    document.getElementById("score").innerHTML = "Score: " + this.game.player.score;
  }

  saveScore() {
    var entry = {
      floor: this.game.level,
      score: this.game.player.score,
    };
    var sorted = this.sortLocalStorage();
    if (entry.score > sorted[4].score || localStorage.length < 5) {
      localStorage.setItem(localStorage.length, JSON.stringify(entry));
    }
  }

  displayScore() {
    if (localStorage.length > 0) {
      var sorted = this.sortLocalStorage();
      var formattedScores = "";
      for(var i = 0; i < 5; i++) {
        formattedScores += "<div>Floor: " + sorted[i].floor + " Score: " + sorted[i].score + "</div>";
      }
      document.getElementById("score-board").innerHTML = formattedScores;
    }
  }

  sortLocalStorage() {
    var highscores = [];
    for(var i = 0; i < localStorage.length; i++) {
      highscores.push(JSON.parse(localStorage[i]));
    }
    var sorted = highscores.sort(function(a,b) {
      return b.score - a.score;
    });
    return sorted;
  }
}

module.exports = Info;
