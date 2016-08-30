class Enemy {
  constructor(grid, cell) {
    this.grid = grid
    this.cell = this.setLocation(cell)
    this.health = 5
  }

  setLocation(cell) {
    var location = this.grid.getCell(cell.x, cell.y)
    location.setValue(4)
    return location
  }

  hit(){
    console.log("Enemy Start Health" + this.health)
    this.health--
    console.log("Enemy End Health" + this.health)
    this.checkHealth()
  }

  checkHealth() {
    if (this.health === 0) {
      this.cell.setValue(1)
    }
  }
}

module.exports = Enemy;
