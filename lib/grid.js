var Cell = require('./cell');

class Grid {
    constructor(grid_data){
        this.height = grid_data.height;
        this.width = grid_data.width;
        this.cells = this.generateCells();
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

        debugger;

        return twoDimArray;
    }

    generate2dArray() {
        var array = [];
        for (var i = 0; i < this.height; i++) {
            array[i] = Array(this.width);
        }
        return array;
    }
}

module.exports = Grid;