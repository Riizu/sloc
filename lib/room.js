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
        return this.grid.pullCells(this.x, this.y, this.width, this.height);
    }

    getCell(x, y) {
        return this.cells.find(function(cell) {
            return cell.x === x && cell.y === y;
        });
    }
}

module.exports = Room;