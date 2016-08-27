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

    hasNeighbors(directionsArray) {
        var hasNeighbors = false;
        var cell = this;
        directionsArray.forEach(function(dir) {
            switch(dir) {
                case "north":
                    if (cell.grid.getCell(cell.x, cell.y - 1).value > 0 ) {
                        hasNeighbors = true;
                    }
                    break;
                case "south":
                    if (cell.grid.getCell(cell.x, cell.y + 1).value > 0 ) {
                        hasNeighbors = true;
                    }
                    break;
                case "east":
                    if (cell.grid.getCell(cell.x + 1, cell.y).value > 0 ) {
                        hasNeighbors = true;
                    }
                    break;
                case "west":
                    if (cell.grid.getCell(cell.x - 1, cell.y).value > 0 ) {
                        hasNeighbors = true;
                    }
                    break;
                case "northeast":
                    if (cell.grid.getCell(cell.x + 1, cell.y -1).value > 0 ) {
                        hasNeighbors = true;
                    }
                    break;
                case "northwest":
                    if (cell.grid.getCell(cell.x - 1, cell.y - 1).value > 0 ) {
                        hasNeighbors = true;
                    }
                    break;
                case "southeast":
                    if (cell.grid.getCell(cell.x + 1, cell.y + 1).value > 0 ) {
                        hasNeighbors = true;
                    }
                    break;
                case "southwest":
                    if (cell.grid.getCell(cell.x - 1, cell.y + 1).value > 0 ) {
                        hasNeighbors = true;
                    }
                    break;
            }
        });
        return hasNeighbors;
    }
}

module.exports = Cell;