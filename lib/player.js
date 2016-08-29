class Player {
  constructor() {
    this.position = null;
    this.grid = null;
  }

  setGrid(grid) {
    this.grid = grid;
  }

  setPosition(cell) {
      this.position = cell;
      cell.setValue(-1);
      return cell;
  }

  determineActionByTarget(targetCell) {
    // is walkable space = setPosition(cell);
    if(targetCell.value === 1) {
      this.position.setValue(1);
      this.setPosition(targetCell);
    } else if(targetCell.value === 2) {
      this.position.setValue(1);
      this.setPosition(targetCell);
    } else if(targetCell.value === 3) {
      var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
      var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
      this.position.setValue(1);
      this.setPosition(cell)
    }

    // is enemy = ??
    // is portal == ??
    // is exit = regen
  }

  moveRight() {
    if(this.position.hasNeighbors(['east']) === true) {
      var targetCell = this.grid.getCell(this.position.x + 1, this.position.y);
      this.determineActionByTarget(targetCell);
    }
  }

  moveLeft() {
    if(this.position.hasNeighbors(['west']) === true) {
      var targetCell = this.grid.getCell(this.position.x - 1, this.position.y);
      this.determineActionByTarget(targetCell);
    }
  }

  moveUp() {
    if(this.position.hasNeighbors(['north']) === true) {
      var targetCell = this.grid.getCell(this.position.x, this.position.y - 1);
      this.determineActionByTarget(targetCell);
    }
  }

  moveDown() {
    if(this.position.hasNeighbors(['south']) === true) {
      var targetCell = this.grid.getCell(this.position.x, this.position.y + 1);
      this.determineActionByTarget(targetCell);
    }
  }
}

module.exports = Player;
