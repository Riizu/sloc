class DisplayHandler {
    constructor(displayData) {
        this.context = displayData.context;
        this.grid = displayData.grid;
        this.tileSize = 16;
    }

    draw() {
        this.clear();
        this.generateRects();
        this.drawRooms();
        this.drawPaths();
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

    drawRooms() {
        var dh = this;
        this.grid.cells.forEach(function(cell) {
            if(cell.value === 2) {
                dh.context.fillStyle = 'white';
                dh.context.fillRect(cell.x * dh.tileSize, cell.y * dh.tileSize, dh.tileSize, dh.tileSize);
            }
        })
    }

    drawPaths() {
        var dh = this;
        this.grid.cells.forEach(function(cell) {
            if(cell.value === 1) {
                dh.context.fillStyle = 'white';
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
