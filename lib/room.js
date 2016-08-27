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
        this.hollow();
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
            this.cells[i].setValue(2);
        }
    }

    hollow() {
        for (var i = this.width; i < this.cells.length - this.width; i++) {
            if((this.leftEdge(i)) && (this.rightEdge(i))) {
                this.cells[i].setValue(1);
            }
        }
    }

    leftEdge(i) {
        return this.cells[i].x !== this.cells[0].x;
    }

    rightEdge(i) {
        return this.cells[i].x !== this.cells[this.width - 1].x
    }
}

module.exports = Room;