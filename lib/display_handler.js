class DisplayHandler {
  constructor(displayData) {
      this.context = displayData.context;
      this.grid = null;
      this.tileSize = 16;
  }

  setGrid(grid) {
    this.grid = grid;
  }

  draw() {
      this.clear();
      this.drawTiles();
  }

  clear() {
      this.context.fillStyle = 'black';
      this.context.fillRect(0, 0, this.grid.width * this.tileSize, this.grid.height * this.tileSize);
  }

  drawTiles() {
      var dh = this;
      this.grid.cells.forEach(function(cell) {
          dh.context.fillStyle = cell.getDisplay();
          dh.context.fillRect(cell.x * dh.tileSize, cell.y * dh.tileSize, dh.tileSize, dh.tileSize);
      });
  }

  drawGameOver() {
    var xPos = (this.grid.width * this.tileSize) / 2 - 260;
    var yPos = (this.grid.height * this.tileSize) / 2;
    this.clear();
    this.context.font = "100px Arial";
    this.context.fillStyle = 'red';
    this.context.fillText("Game Over", xPos, yPos);
  }

  drawGameWon() {
    var xPos = (this.grid.width * this.tileSize) / 2 - 210;
    var yPos = (this.grid.height * this.tileSize) / 2;
    this.clear();
    this.context.font = "100px Arial";
    this.context.fillStyle = 'green';
    this.context.fillText("You Win!", xPos, yPos);
  }
}

module.exports = DisplayHandler;
