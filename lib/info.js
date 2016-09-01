class Info {
  constructor(gameEngine) {
    this.game = gameEngine;
  }

  updateAttributes() {
    document.getElementById("health").innerHTML = "Coder's Moral: " + this.game.player.health;
    document.getElementById("level").innerHTML = "Floor: " + this.game.level;
    document.getElementById("score").innerHTML = "Commits: " + this.game.player.score;
  }

  saveScore() {
    var entry = {
      floor: this.game.level,
      score: this.game.player.score,
    };
    var sorted = this.sortLocalStorage();
    if (sorted.length < 5) {
      localStorage.setItem(localStorage.length, JSON.stringify(entry));
    } else if (entry.score > sorted[4].score) {
      localStorage.setItem(localStorage.length, JSON.stringify(entry));
    }
  }

  displayScore() {
    if (localStorage.length > 0) {
      var sorted = this.sortLocalStorage();
      var formattedScores = "";
      if (sorted.length >= 5) {
        for(var i = 0; i < 5; i++) {
          formattedScores += "<div>Floor: " + sorted[i].floor + " Commits: " + sorted[i].score + "</div>";
        }
      } else {
        for(var j = 0; j < sorted.length; j++) {
          formattedScores += "<div>Floor: " + sorted[j].floor + " Commits: " + sorted[j].score + "</div>";
        }
      }
      document.getElementById('high-score').removeAttribute('hidden');
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
