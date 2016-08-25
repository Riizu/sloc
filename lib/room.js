class Room {
    constructor(roomData) {
        this.x = roomData.x;
        this.y = roomData.y;
        this.height = roomData.height;
        this.width = roomData.width;
        this.grid = roomData.grid;
        this.cells = this.pullCells();
    }

    pullCells() {
        var cells = this.grid.pullCells(this.x, this.y, this.width, this.height);
        this.cellArray = cells;
        this.setCellsRoomValue();
        return cells;
    }

    getCell(x, y) {
        return this.cellArray.find(function(cell) {
            return cell.x === x && cell.y === y;
        });
    }

    setCellsRoomValue() {
        for (var i = 0; i < this.cellArray.length; i++) {
            this.cellArray[i].room = this;
        }
    }
}

module.exports = Room;