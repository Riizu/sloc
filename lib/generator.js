var Grid = require('./grid');
var Enemy = require('./enemy');

class Generator {
    constructor(displayHandler, player) {
        this.grid = null;
        this.player = player;
        this.displayHandler = displayHandler;
    }

    generateLevel(gridWidth, gridHeight, roomAttempts, minRoom, maxRoom, portalNumber, enemyCount, healthPacks) {
      this.grid = new Grid({width: gridWidth, height: gridHeight});
      this.displayHandler.setGrid(this.grid);
      this.player.setGrid(this.grid);
      this.grid.player = this.player;
      this.generateRooms(roomAttempts, minRoom, maxRoom);
      this.generateCorridors();
      this.generatePlayerPosition();
      this.generatePortals(portalNumber);
      this.generateEnemies(enemyCount);
      this.generateHealthPacks(healthPacks);

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
            var startX = startPoint.x;
            var startY = startPoint.y;
            var endX = endPoint.x;
            var endY = endPoint.y;

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

    generatePortals(portalAmount) {
      for( var i = 0; i < portalAmount; i ++) {
        var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
        var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
        var secondroom = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
        var targetCell = secondroom.cells[Math.floor(Math.random() * secondroom.cells.length)];

        cell.setValue(3);
        cell.portalTarget = targetCell;
      }
    }

    generateEnemies(enemyAmount) {
      for( var i = 0; i < enemyAmount; i ++) {
        var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
        var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
        var enemy = new Enemy(this.grid, cell);
        this.grid.enemies.push(enemy);
      }
    }

    generateHealthPacks(healthPacks) {
      for( var i = 0; i < healthPacks; i++) {
        var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
        var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
        cell.setValue(5);
      }
    }
}

module.exports = Generator;
