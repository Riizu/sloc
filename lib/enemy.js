class Enemy {
  constructor(grid, cell) {
    this.grid = grid
    this.cell = this.setLocation(cell)
    this.health = 5
  }

  setLocation(cell) {
    console.log(this.grid)
    var location = this.grid.getCell(cell.x, cell.y)
    location.setValue(4)
    return location
  }
}

module.exports = Enemy;
