var Cell = require('./cell');

class Room {
    constructor(roomData) {
        this.x = roomData.x;
        this.y = roomData.y;
        this.height = roomData.height;
        this.width = roomData.width;
        this.cells = this.pullCells();
    }

    pullCells() {
        var array = [];
        for (var i = 0; i < this.height; i++) {
            array[i] = Array(this.width);
        }

        for (var x = 0; x < this.height; x++) {
            for (var y = 0; y < this.width; y++) {
                var cell_data = {
                    x: x,
                    y: y,
                    value: 0,
                };
                array[x][y] = new Cell(cell_data);
            }
        }

        return array;
    }

    getCell(x, y) {
        return this.cells[x][y];
    }
}

module.exports = Room;