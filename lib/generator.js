class Generator {
    constructor(grid, player) {
        this.grid = grid;
        this.player = player;
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
        var usableRooms = grid.rooms;

        usableRooms.forEach(function(room) {
            var ri = Math.floor(Math.random() * usableRooms.length);
            var mainRoom = usableRooms[ri];
            var startPoint = mainRoom.cells[Math.floor(Math.random() * mainRoom.cells.length)];
            var endPoint = room.cells[Math.floor(Math.random() * room.cells.length)];

            while ((endPoint.x !== startPoint.x) || (endPoint.y !== startPoint.y)) {
                if (endPoint.x !== startPoint.x) {
                    if (endPoint.x > startPoint.x){
                        endPoint.x--;
                    }
                    else {
                        endPoint.x++;
                    }
                }
                else if (endPoint.y !== startPoint.y) {
                    if (endPoint.y > startPoint.y) {
                        endPoint.y--;
                    } else {
                        endPoint.y++;
                    }
                }

                grid.getCell(endPoint.x, endPoint.y).setValue(1);
            }
        });
    }

    generatePlayer() {
      var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
      var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
      this.player.setPosition(cell);
    }

    generateMazes() {
        var grid = this.grid;
        //var startCell = this.findMazeStart();

        // while(startCell) {
        //     startCell.setValue(3); //set to high value for ignoring the cell during maze gen
        //     //grid.makeMaze(startCell);
        //     startCell = grid.findMazeStart();
        // }

        for (var y = 1; y < grid.effectiveHeight; y += 2) {
            for (var x = 1; x < grid.effectiveWidth; x += 2) {
                if (grid.getCell(x, y).value === 0) {
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

module.exports = Generator;
