class DisplayHandler {
  constructor(displayData) {
      this.context = displayData.context;
      this.grid = null;
      this.tileSize = 64;
      this.offsetX = 0;
      this.offsetY = 0;
  }

  setGrid(grid) {
    this.grid = grid;
  }

  setCamera(camera) {
    this.camera = camera;
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

      var startingCell = this.grid.getCell(this.camera.x, this.camera.y);
      this.offsetX = startingCell.x;
      this.offsetY = startingCell.y;

      this.grid.cells.forEach(function(cell) {
        if(dh.camera.cellWithinView(cell)) {
          dh.context.fillStyle = cell.getDisplay();
          dh.context.fillRect((cell.x - dh.offsetX) * dh.tileSize, (cell.y - dh.offsetY) * dh.tileSize, dh.tileSize, dh.tileSize);
        }
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
