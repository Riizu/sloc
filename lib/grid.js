var Cell = require('./cell');
var Room = require('./room');

class Grid {
    constructor(grid_data){
        this.height = grid_data.height;
        this.width = grid_data.width;
        this.effectiveHeight = this.height - 1;
        this.effectiveWidth = this.width - 1;
        this.cellArray = this.generateCells();
        this.cells = this.cells();
        this.rooms = [];
    }

    generateCells() {
        var twoDimArray = this.generate2dArray();
        var grid = this;

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var cell_data = {
                    x: x,
                    y: y,
                    value: 0,
                    grid: grid,
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

        var x = Math.floor((Math.random() * (this.effectiveWidth - width)) + 1);
        var y = Math.floor((Math.random() * (this.effectiveHeight - height))+ 1);

        if (this.isNotOccupied(x, y, width, height)) {
          this.createRoom({x: x, y: y, width: width, height: height});
        }
      }
    }

    generateMazes() {
        var grid = this;        
        //var startCell = this.findMazeStart();

        // while(startCell) {
        //     startCell.setValue(3); //set to high value for ignoring the cell during maze gen
        //     //grid.makeMaze(startCell);
        //     startCell = grid.findMazeStart();
        // }

        for (var y = 1; y < this.effectiveHeight; y += 2) {
            for (var x = 1; x < this.effectiveWidth; x += 2) {
                if (this.getCell(x, y).value === 0) {
                    //this.makeMaze(this.getCell(x, y));
                }
            }
        }
    }


    findMazeStart() {
        // var initialCells = this.pullCells(1, 1, this.effectiveWidth - 1, this.effectiveHeight - 1);
        // return initialCells.find(function(cell) {
        //     var noNeighbors = cell.hasNeighbors(['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest']) === false;
        //     if (noNeighbors && cell.value === 0) {
        //         return true;
        //     }
        // });

        
    }

    makeMaze(startCell) {
        var remainingCellsInMaze = [];
        var counter = 5;

        console.log(startCell);

        remainingCellsInMaze.push(startCell);
        console.log(remainingCellsInMaze);

        while(counter > 0) {
            var cell = remainingCellsInMaze[remainingCellsInMaze.length - 1]; //get the last one
            var randomNeighbor = cell.findRandomNeighbor(); //get a random neighbor
            
            if(randomNeighbor) { // if randomneighbor exists
                randomNeighbor.setValue(3); //make it a path thats not visited
                cell.setValue(1); //make this cell count for neighbor checks again (its been visited)
                remainingCellsInMaze.push(randomNeighbor); //push new cell(the neighbor) onto the list
            } else {
                remainingCellsInMaze.pop(); //otherwise, pop the cell if no neighbors were found
            }

            counter--;
        }
    }
}

module.exports = Grid;
