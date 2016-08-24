class Room {
    constructor(roomData) {
        this.x = roomData.x;
        this.y = roomData.y;
        this.height = roomData.height;
        this.width = roomData.width;
        this.cells = this.getCells();
    }

    getCells() {
        var array = [];
        for (var i = 0; i < this.height; i++) {
            array[i] = Array(this.width);
        }
        return array;
    }
}

module.exports = Room;