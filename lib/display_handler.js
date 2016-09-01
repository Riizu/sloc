class DisplayHandler {
  constructor(displayData) {
      this.context = displayData.context;
      this.grid = null;
      this.tileSize = 32;
      this.offsetX = 0;
      this.offsetY = 0;
      this.tiles = new Image();
      this.tiles.src = "../assets/images/tiles.png";
      this.player = new Image();
      this.player.src = "../assets/images/hero.png";
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

  drawTile(tile, x, y, image) {
    var tileX = tile % 8;
    var tileY = Math.floor(tile/8);
    var dh = this;

    dh.context.drawImage(image, tileX * dh.tileSize, tileY * dh.tileSize, dh.tileSize, dh.tileSize, x, y, dh.tileSize, dh.tileSize);
}


  drawTiles() {
      var dh = this;

      var startingCell = this.grid.getCell(this.camera.x, this.camera.y);
      this.offsetX = startingCell.x;
      this.offsetY = startingCell.y;

      this.grid.cells.forEach(function(cell) {
        if(dh.camera.cellWithinView(cell)) {
            var x = (cell.x - dh.offsetX) * dh.tileSize;
            var y = (cell.y - dh.offsetY) * dh.tileSize;

            dh.drawTile(0, x, y, dh.tiles);
            if (cell.value === -1) {
              dh.drawTile(cell.getDisplay(), x, y, dh.player);
            } else {
              dh.drawTile(cell.getDisplay(), x, y, dh.tiles);
            }
        }
      });
  }

  drawSubText(text) {
    this.context.font = "30px Arial";
    this.context.fillStyle = 'white';
    var xPos = (this.context.canvas.width) / 2 - 150;
    var yPos = (this.context.canvas.height) / 2 + 50;
    this.context.fillText(text, xPos, yPos);
  }

  drawStartSplash() {
    var xPos = (this.context.canvas.width) / 2 - 400;
    var yPos = (this.context.canvas.height) / 2;
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.font = "80px Arial";
    this.context.fillStyle = 'red';
    this.context.fillText("Seven Levels of Code", xPos, yPos);
    this.drawSubText("Press Space to Begin");
  }

  drawGameOver() {
    var xPos = (this.context.canvas.width) / 2 - 220;
    var yPos = (this.context.canvas.height) / 2;
    this.clear();
    this.context.font = "100px Arial";
    this.context.fillStyle = 'red';
    this.context.fillText("You Died", xPos, yPos);
    this.drawSubText("Press Space to Restart");
  }

  drawGameWon() {
    var xPos = (this.context.canvas.width) / 2 - 210;
    var yPos = (this.context.canvas.height) / 2;
    this.clear();
    this.context.font = "100px Arial";
    this.context.fillStyle = 'green';
    this.context.fillText("You Win!", xPos, yPos);
  }
}

module.exports = DisplayHandler;
