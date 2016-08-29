var Grid = require('./grid');

class Generator {
    constructor(displayHandler, player) {
        this.grid = null;
        this.player = player;
        this.displayHandler = displayHandler;
    }

    generateLevel(gridWidth, gridHeight, roomAttempts, minRoom, maxRoom, portalNumber) {
      this.grid = new Grid({width: gridWidth, height: gridHeight});
      this.displayHandler.setGrid(this.grid);
      this.player.setGrid(this.grid);
      this.generateRooms(roomAttempts, minRoom, maxRoom);
      this.generateCorridors();
      this.generatePlayerPosition();
      this.generatePortals(portalNumber)

      var exit = this.generateExit();
      return exit;
    }

    generateRooms(attempts, min, max) {
      for(var i = 0; i < attempts; i++) {
        var width = Math.floor((Math.random() * (max - min)) + min);
        var height = Math.floor((Math.random() * (max - min)) + min);

        var x = Math.floor((Math.random() * (this.grid.effectiveWidth - width)) + 1);
        var y = Math.floor((Math.random() * (this.grid.effectiveHeight - height))+ 1);

        if (this.grid.isNotOccupied(x, y, width, height)) {
          this.grid.createRoom({x: x, y: y, width: width, height: height});
        }
      }
    }

    generateCorridors() {
        var grid = this.grid;
        var useableRooms = grid.rooms;

        useableRooms.forEach(function(room) {
            var ri = Math.floor(Math.random() * useableRooms.length);
            var mainRoom = useableRooms[ri];
            var startPoint = mainRoom.cells[Math.floor(Math.random() * mainRoom.cells.length)];
            var endPoint = room.cells[Math.floor(Math.random() * room.cells.length)];
            var startX = startPoint.x
            var startY = startPoint.y
            var endX = endPoint.x
            var endY = endPoint.y

            while ((endX !== startX) || (endY !== startY)) {
                if (endX !== startX) {
                    if (endX > startX){
                        endX--;
                    }
                    else {
                        endX++;
                    }
                }
                else if (endY !== startY) {
                    if (endY > startY) {
                        endY--;
                    } else {
                        endY++;
                    }
                }

                grid.getCell(endX, endY).setValue(1);
            }
        });

        console.log(this.grid.cells.length);
    }

    generatePlayerPosition() {
      var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
      var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
      this.player.setPosition(cell);
    }

    generateExit() {
      var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
      var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
      this.grid.exit = cell;
      cell.setValue(2);
      return cell;
    }

    // generatePortals(n) {
    //   for( var i = 0; i < n; i ++) {
    //     var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
    //     var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
    //     cell.setValue(3);
    //   }
    // }

    generatePortals(n) {
      for( var i = 0; i < n; i ++) {
        var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
        var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
        var secondroom = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
        var targetCell = secondroom.cells[Math.floor(Math.random() * secondroom.cells.length)];

        cell.setValue(3);
        cell.locationCell = targetCell
      }
    }

    // generateMazes() {
    //     var grid = this.grid;
    //     //var startCell = this.findMazeStart();
    //
    //     // while(startCell) {
    //     //     startCell.setValue(3); //set to high value for ignoring the cell during maze gen
    //     //     //grid.makeMaze(startCell);
    //     //     startCell = grid.findMazeStart();
    //     // }
    //
    //     for (var y = 1; y < grid.effectiveHeight; y += 2) {
    //         for (var x = 1; x < grid.effectiveWidth; x += 2) {
    //             if (grid.getCell(x, y).value === 0) {
    //                 //this.makeMaze(this.getCell(x, y));
    //             }
    //         }
    //     }
    // }
    //
    //
    // findMazeStart() {
    //     // var initialCells = this.pullCells(1, 1, this.effectiveWidth - 1, this.effectiveHeight - 1);
    //     // return initialCells.find(function(cell) {
    //     //     var noNeighbors = cell.hasNeighbors(['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest']) === false;
    //     //     if (noNeighbors && cell.value === 0) {
    //     //         return true;
    //     //     }
    //     // });
    //
    //
    // }
    //
    // makeMaze(startCell) {
    //     var remainingCellsInMaze = [];
    //     var counter = 5;
    //
    //     console.log(startCell);
    //
    //     remainingCellsInMaze.push(startCell);
    //     console.log(remainingCellsInMaze);
    //
    //     while(counter > 0) {
    //         var cell = remainingCellsInMaze[remainingCellsInMaze.length - 1]; //get the last one
    //         var randomNeighbor = cell.findRandomNeighbor(); //get a random neighbor
    //
    //         if(randomNeighbor) { // if randomneighbor exists
    //             randomNeighbor.setValue(3); //make it a path thats not visited
    //             cell.setValue(1); //make this cell count for neighbor checks again (its been visited)
    //             remainingCellsInMaze.push(randomNeighbor); //push new cell(the neighbor) onto the list
    //         } else {
    //             remainingCellsInMaze.pop(); //otherwise, pop the cell if no neighbors were found
    //         }
    //
    //         counter--;
    //     }
    // }
}

module.exports = Generator;
