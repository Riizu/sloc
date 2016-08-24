class Cell {
    constructor(cell_data) {
        this.x = cell_data.x;
        this.y = cell_data.y;
        this.value = cell_data.value;
    }

    setValue(value) {
        this.value = value;
        return this; 
    }
}

module.exports = Cell;