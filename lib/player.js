class Player {
  constructor() {
    this.position = null;
    this.grid = null;
    this.health = 10;
    this.score = 0;
  }

  setGrid(grid) {
    this.grid = grid;
  }

  setEngine(engine) {
    this.engine = engine;
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
      this.position.setValue(1);
      this.setPosition(targetCell.portalTarget);
    } else if(targetCell.value === 4) {
      var enemy = this.grid.enemies.find(function(enemy) {
        return enemy.cell.x === targetCell.x && enemy.cell.y === targetCell.y;
      });
      enemy.hit();
    } else if(targetCell.value === 5) {
      this.position.setValue(1);
      this.setPosition(targetCell);
      this.health += 5;
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

  hit() {
    this.health--;
    if (this.health === 0) {
      this.engine.info.saveScore();
      this.engine.info.displayScore();
    }
  }
}

module.exports = Player;
