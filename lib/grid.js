var Cell = require('./cell');
var Room = require('./room');

class Grid {
    constructor(grid_data){
        this.height = grid_data.height;
        this.width = grid_data.width;
        this.cellArray = this.generateCells();
        this.cells = this.cells();
        this.rooms = [];
    }

    generateCells() {
        var twoDimArray = this.generate2dArray();

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var cell_data = {
                    x: x,
                    y: y,
                    value: 0,
                };
                twoDimArray[y][x] = new Cell(cell_data);
            }
        }

        return twoDimArray;
    }

    generate2dArray() {
        var array = [];
        for (var i = 0; i < this.height; i++) {
            array[i] = Array(this.width);
        }
        return array;
    }

    cells() {
        var cells = [];

        for(var y = 0; y < this.height; y++) {
            for(var x = 0; x < this.width; x++) {
                cells.push(this.cellArray[y][x]);
            }
        }

        return cells;
    }
    getCell(x, y) {
        return this.cellArray[y][x];
    }

    pullCells(startingX, startingY, width, height) {
        var cells = [];

        for (var y = startingY; y < (startingY + height); y++) {
            for (var x = startingX; x < (startingX + width); x++) {
                cells.push(this.cellArray[y][x]);
            }
        }

        return cells;
    }

    createRoom(roomInfo) {
        roomInfo.grid = this;
        var newRoom = new Room(roomInfo);
        this.rooms.push(newRoom);
        return newRoom;
    }

    findRoom(x, y) {
        return this.rooms.find(function(room) {
            return room.x === x && room.y === y;
        });
    }

    isNotOccupied(startingX, startingY, width, height) {
      var empty = true;
      var cells = this.pullCells(startingX, startingY, width, height)
      cells.forEach(function(cell) {
        if (cell.room) {
          empty = false;
        }
      });
      return empty;
    }

    generateRooms(attempts, min, max) {
      for(var i = 0; i < attempts; i++) {
        var width = Math.floor((Math.random() * (max - min)) + min);
        var height = Math.floor((Math.random() * (max - min)) + min);

        var x = Math.floor((Math.random() * (this.width - width)));
        var y = Math.floor((Math.random() * (this.height - height)));

        console.log(x + "|" + y + "|" + width + "|" + height);

        if (this.isNotOccupied(x, y, width, height)) {
          this.createRoom({x: x, y: y, width: width, height: height});
          console.log('made a room');
        }
      }
    }
}

module.exports = Grid;
