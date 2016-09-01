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

    getDisplay() {
        var display = null;
        switch(this.value) {
            case -1:
                display =  0;
                break;
            case 0:
                display =  1;
                break;
            case 1:
                display =  0;
                break;
            case 2:
                display = 3;
                break;
            case 3:
                display = 6;
                break;
            case 4:
                display = 7;
                break;
            case 5:
                display = 4;
                break;
        }
        return display;
    }

    hasNeighbors(directionsArray) {
        var hasNeighbors = false;
        var cell = this;
        directionsArray.forEach(function(dir) {
            switch(dir) {
                case "north":
                    if (cell.grid.getCell(cell.x, cell.y - 1).value > 0 && cell.grid.getCell(cell.x, cell.y - 1).value < 10) {
                        hasNeighbors = true;
                    }
                    break;
                case "south":
                    if (cell.grid.getCell(cell.x, cell.y + 1).value > 0 && cell.grid.getCell(cell.x, cell.y + 1).value < 10) {
                        hasNeighbors = true;
                    }
                    break;
                case "east":
                    if (cell.grid.getCell(cell.x + 1, cell.y).value > 0 && cell.grid.getCell(cell.x + 1, cell.y).value < 10) {
                        hasNeighbors = true;
                    }
                    break;
                case "west":
                    if (cell.grid.getCell(cell.x - 1, cell.y).value > 0 && cell.grid.getCell(cell.x - 1, cell.y).value < 10) {
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
