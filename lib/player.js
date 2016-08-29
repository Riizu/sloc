class Player {
  constructor(grid, position) {
    this.position = position
    this.grid = grid
  }

  setPosition(cell) {
      this.position = cell;
      cell.setValue(-1);
      return cell;
  }

  moveRight() {
    if(this.position.hasNeighbors(['east']) === true) {
      this.position.setValue(1);
      this.setPosition(this.grid.getCell(this.position.x + 1, this.position.y));
      var targetCell = this.grid.getCell(this.position.x + 1, this.position.y)
      console.log(this.position.x + "|" + this.position.y + "|" + this.position.value)
      console.log(targetCell.x + "|" + targetCell.y + "|" + targetCell.value)
    }
  }

  moveLeft() {
    if(this.position.hasNeighbors(['west']) === true) {
      this.position.setValue(1);
      this.setPosition(this.grid.getCell(this.position.x - 1, this.position.y));
    }
  }

  moveUp() {
    if(this.position.hasNeighbors(['north']) === true) {
      this.position.setValue(1);
      this.setPosition(this.grid.getCell(this.position.x, this.position.y - 1));
    }
  }

  moveDown() {
    if(this.position.hasNeighbors(['south']) === true) {
      this.position.setValue(1);
      this.setPosition(this.grid.getCell(this.position.x, this.position.y + 1));
    }
  }
}

module.exports = Player;
