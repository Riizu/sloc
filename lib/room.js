class Room {
    constructor(roomData) {
        this.x = roomData.x;
        this.y = roomData.y;
        this.height = roomData.height;
        this.width = roomData.width;
        this.grid = roomData.grid;
        this.cells = this.pullCells();
        this.setCellsRoomValue();
        this.setCellsValue();
    }

    pullCells() {
        var cells = this.grid.pullCells(this.x, this.y, this.width, this.height);
        return cells;
    }

    getCell(x, y) {
        return this.cells.find(function(cell) {
            return cell.x === x && cell.y === y;
        });
    }

    setCellsRoomValue() {
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].room = this;
        }
    }

    setCellsValue() {
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].setValue(1);
        }
    }
}

module.exports = Room;
