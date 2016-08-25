class Cell {
    constructor(cell_data) {
        this.x = cell_data.x;
        this.y = cell_data.y;
        this.value = cell_data.value;
        this.room = null;
        this.grid = cell_data.grid;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    checkNeighbors(directionsArray) {
        var counter = 0;
        var cell = this;
        directionsArray.forEach(function(dir) {
            switch(dir) {
                case "north":
                    if (cell.grid.getCell(cell.x, cell.y - 1).value > 0 ) {
                        counter += 1;
                    }
                    break;
                case "south":
                    if (cell.grid.getCell(cell.x, cell.y + 1).value > 0 ) {
                        counter += 1;
                    }
                    break;
                case "east":
                    if (cell.grid.getCell(cell.x + 1, cell.y).value > 0 ) {
                        counter += 1;
                    }
                    break;
                case "west":
                    if (cell.grid.getCell(cell.x - 1, cell.y).value > 0 ) {
                        counter += 1;
                    }
                    break;
            }
        });
        return counter;
    }
}

module.exports = Cell;
