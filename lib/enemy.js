class Enemy {
  constructor(grid, cell) {
    this.grid = grid;
    this.cell = this.setLocation(cell);
    this.health = 5;
  }

  setLocation(cell) {
    var location = this.grid.getCell(cell.x, cell.y);
    location.setValue(4);
    return location;
  }

  hit(){
    console.log("Enemy Start Health" + this.health);
    this.health--;
    console.log("Enemy End Health" + this.health);
    this.checkHealth();
  }

  checkHealth() {
    if (this.health === 0) {
      this.cell.setValue(1);
      if (this.grid.player.health > 0) {
        this.grid.player.score += 100;
      }
    }
  }

  chase() {
    var enemyX = this.cell.x;
    var enemyY = this.cell.y;
    var playerX = this.grid.player.position.x;
    var playerY = this.grid.player.position.y;
    var change = {
      x: Math.min(1, Math.max(-1, (playerX - enemyX))),
      y: Math.min(1, Math.max(-1, (playerY - enemyY))),
    };

    if(change.x !== 0 && change.y !== 0){
      if(Math.random() > 0.5){
        change.x = 0;
      } else {
        change.y = 0;
      }
    }

    var newCell = this.grid.getCell(this.cell.x + change.x, this.cell.y + change.y);
    switch(newCell.value) {
      case 1:
      case 0:
        this.cell.setValue(1);
        this.cell = newCell.setValue(4);
        break;
      case -1:
        this.grid.player.hit();
      }
  }
}

module.exports = Enemy;
