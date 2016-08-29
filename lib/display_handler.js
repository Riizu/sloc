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
        this.generateRects();
        this.drawDungeon();
        this.drawExit();
        this.drawPortals()
        this.drawPlayer();
    }

    clear() {
        this.context.clearRect(0, 0, this.context.width, this.context.height);
    }

    generateRects() {
        var dh = this;
        dh.context.fillStyle = 'black';
        this.grid.cells.forEach(function(cell) {
            dh.context.fillRect(cell.x * dh.tileSize, cell.y * dh.tileSize, dh.tileSize, dh.tileSize);
        });
        dh.context.stroke();
    }

    drawDungeon() {
        var dh = this;
        this.grid.cells.forEach(function(cell) {
            if(cell.value === 1) {
                dh.context.fillStyle = 'gray';
                dh.context.fillRect(cell.x * dh.tileSize, cell.y * dh.tileSize, dh.tileSize, dh.tileSize);
            }
        })
    }

    drawExit() {
        var dh = this;
        this.grid.cells.forEach(function(cell) {
            if(cell.value === 2) {
                dh.context.fillStyle = 'green';
                dh.context.fillRect(cell.x * dh.tileSize, cell.y * dh.tileSize, dh.tileSize, dh.tileSize);
            }
        });
    }

    drawPortals() {
      var dh = this;
      this.grid.cells.forEach(function(cell) {
          if(cell.value === 3) {
              dh.context.fillStyle = 'purple';
              dh.context.fillRect(cell.x * dh.tileSize, cell.y * dh.tileSize, dh.tileSize, dh.tileSize);
          }
      });
    }

    drawPlayer() {
      var dh = this;
      this.grid.cells.forEach(function(cell) {
        if(cell.value === -1) {
          dh.context.fillStyle = 'blue';
          dh.context.fillRect(cell.x * dh.tileSize, cell.y * dh.tileSize, dh.tileSize, dh.tileSize);
        }
      });
    }
}

module.exports = DisplayHandler;
