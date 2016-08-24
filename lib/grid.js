var Cell = require('./cell');
var Room = require('./room');

class Grid {
    constructor(grid_data){
        this.height = grid_data.height;
        this.width = grid_data.width;
        this.cells = this.generateCells();
        this.rooms = [];
    }

    generateCells() {
        var twoDimArray = this.generate2dArray();

        for (var x = 0; x < this.height; x++) {
            for (var y = 0; y < this.width; y++) {
                var cell_data = {
                    x: x,
                    y: y,
                    value: 0,
                };
                twoDimArray[x][y] = new Cell(cell_data);
            }
        }

        return twoDimArray;
    }

    generate2dArray() {
        var array = [];
        for (var i = 0; i < this.height; i++) {
            array[i] = Array(this.width);
        }
        return array;
    }

    getCell(x, y) {
        return this.cells[x][y];
    }

    pullCells(startingX, startingY, width, height) {
        var cells = [];

        for (var x = startingX; x < height; x++) {
            for (var y = startingY; y < width; y++) {
                cells.push(this.cells[x][y]);
            }
        }

        return cells;
    }

    createRoom(roomInfo) {
        roomInfo.grid = this;
        return new Room(roomInfo);
    }
}

module.exports = Grid;