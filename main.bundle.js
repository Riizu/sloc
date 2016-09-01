/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var GameEngine = __webpack_require__(1);

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var gameEngine = new GameEngine(context);

	gameEngine.play();

	window.addEventListener("keydown", function (event) {
	    switch (event.which) {
	        case 32:
	            gameEngine.startGame();
	            break;
	        case 37:
	            gameEngine.player.moveLeft();
	            break;
	        case 38:
	            gameEngine.player.moveUp();
	            break;
	        case 39:
	            gameEngine.player.moveRight();
	            break;
	        case 40:
	            gameEngine.player.moveDown();
	            break;
	    }

	    if ([37, 38, 39, 40].includes(event.which)) {
	        event.preventDefault();
	        gameEngine.generator.grid.enemies.forEach(e => e.chase());
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Generator = __webpack_require__(2);
	var DisplayHandler = __webpack_require__(7);
	var Camera = __webpack_require__(8);
	var Info = __webpack_require__(9);
	var Player = __webpack_require__(10);

	class GameEngine {
	  constructor(context) {
	    this.level = 0;
	    this.player = new Player();
	    this.displayHandler = new DisplayHandler({ context: context });
	    this.generator = new Generator(this.displayHandler, this.player);
	    this.camera = new Camera(this);
	    this.info = new Info(this);
	    this.player.setEngine(this);
	    this.firstPass = 0;
	    this.notStarted = true;
	    this.levelWon = true;
	  }

	  startGame() {
	    if (this.notStarted) {
	      this.notStarted = false;
	    } else if (this.notStarted === false && this.gameOver()) {
	      this.player.health = 10;
	      this.player.score = 0;
	      this.level = 0;
	      this.firstPass = 0;
	      this.levelWon = true;
	    } else if (this.notStarted === false && this.gameWon()) {
	      this.level = 9;
	      this.firstPass = 0;
	      this.levelWon = true;
	    }
	  }

	  play() {
	    var exit = null;
	    var generator = this.generator;
	    var dh = this.displayHandler;
	    var player = this.player;
	    var game = this;

	    requestAnimationFrame(function drawLoop() {
	      if (game.notStarted) {
	        dh.drawStartSplash();
	      } else if (game.levelWon) {
	        game.level++;
	        dh.setCamera(game.camera);
	        exit = generator.generateLevel(Math.round(56 * (game.level / 2)), Math.round(40 * (game.level / 2)), 10 * game.level, 5 + game.level, 11 + game.level, 5 * game.level, 10 * (game.level / 2), 5 * (game.level / 2));
	        game.levelWon = false;
	      } else if (game.gameWon()) {
	        dh.drawGameWon();
	      } else if (game.gameOver()) {
	        dh.drawGameOver();
	      } else {
	        game.info.updateAttributes();
	        game.camera.update();
	        dh.draw();
	        game.levelWon = game.checkWinCondition(exit, player);
	      }

	      requestAnimationFrame(drawLoop);
	    });
	  }

	  gameWon() {
	    if (this.firstPass === 0 && this.level === 8) {
	      this.firstPass++;
	    }
	    if (this.firstPass === 1 && this.level >= 8) {
	      this.firstPass++;
	      this.level--;
	      this.info.saveScore();
	      this.info.displayScore();
	      this.level++;
	      return true;
	    }
	    if (this.level === 8) {
	      return true;
	    } else if (this.level === 9) {
	      this.level = 8;
	      return false;
	    }
	  }

	  checkWinCondition(exit, player) {
	    return exit.x === player.position.x && exit.y === player.position.y && exit.value === -1;
	  }

	  gameOver() {
	    if (this.player.health <= 0) {
	      this.player.health = 0;
	      this.info.updateAttributes();
	      return true;
	    }
	    return false;
	  }
	}

	module.exports = GameEngine;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Grid = __webpack_require__(3);
	var Enemy = __webpack_require__(6);

	class Generator {
	  constructor(displayHandler, player) {
	    this.grid = null;
	    this.player = player;
	    this.displayHandler = displayHandler;
	  }

	  generateLevel(gridWidth, gridHeight, roomAttempts, minRoom, maxRoom, portalNumber, enemyCount, healthPacks) {
	    this.grid = new Grid({ width: gridWidth, height: gridHeight });
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
	    for (var i = 0; i < attempts; i++) {
	      var width = Math.floor(Math.random() * (max - min) + min);
	      var height = Math.floor(Math.random() * (max - min) + min);

	      var x = Math.floor(Math.random() * (this.grid.effectiveWidth - width) + 1);
	      var y = Math.floor(Math.random() * (this.grid.effectiveHeight - height) + 1);

	      if (this.grid.isNotOccupied(x, y, width, height)) {
	        this.grid.createRoom({ x: x, y: y, width: width, height: height });
	      }
	    }
	  }

	  generateCorridors() {
	    var grid = this.grid;
	    var useableRooms = grid.rooms;

	    useableRooms.forEach(function (room) {
	      var ri = Math.floor(Math.random() * useableRooms.length);
	      var mainRoom = useableRooms[ri];
	      var startPoint = mainRoom.cells[Math.floor(Math.random() * mainRoom.cells.length)];
	      var endPoint = room.cells[Math.floor(Math.random() * room.cells.length)];
	      var startX = startPoint.x;
	      var startY = startPoint.y;
	      var endX = endPoint.x;
	      var endY = endPoint.y;

	      while (endX !== startX || endY !== startY) {
	        if (endX !== startX) {
	          if (endX > startX) {
	            endX--;
	          } else {
	            endX++;
	          }
	        } else if (endY !== startY) {
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
	    for (var i = 0; i < portalAmount; i++) {
	      var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
	      var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
	      var secondroom = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
	      var targetCell = secondroom.cells[Math.floor(Math.random() * secondroom.cells.length)];

	      cell.setValue(3);
	      cell.portalTarget = targetCell;
	    }
	  }

	  generateEnemies(enemyAmount) {
	    for (var i = 0; i < enemyAmount; i++) {
	      var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
	      var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
	      var enemy = new Enemy(this.grid, cell);
	      this.grid.enemies.push(enemy);
	    }
	  }

	  generateHealthPacks(healthPacks) {
	    for (var i = 0; i < healthPacks; i++) {
	      var room = this.grid.rooms[Math.floor(Math.random() * this.grid.rooms.length)];
	      var cell = room.cells[Math.floor(Math.random() * room.cells.length)];
	      cell.setValue(5);
	    }
	  }
	}

	module.exports = Generator;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Cell = __webpack_require__(4);
	var Room = __webpack_require__(5);

	class Grid {
	    constructor(grid_data) {
	        this.height = grid_data.height;
	        this.width = grid_data.width;
	        this.effectiveHeight = this.height - 1;
	        this.effectiveWidth = this.width - 1;
	        this.cellArray = this.generateCells();
	        this.cells = this.cells();
	        this.rooms = [];
	        this.enemies = [];
	        this.player = null;
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
	                    grid: grid
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

	        for (var y = 0; y < this.height; y++) {
	            for (var x = 0; x < this.width; x++) {
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

	        for (var y = startingY; y < startingY + height; y++) {
	            for (var x = startingX; x < startingX + width; x++) {
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
	        return this.rooms.find(function (room) {
	            return room.x === x && room.y === y;
	        });
	    }

	    isNotOccupied(startingX, startingY, width, height) {
	        var empty = true;
	        var cells = this.pullCells(startingX, startingY, width, height);
	        cells.forEach(function (cell) {
	            if (cell.room || cell.hasNeighbors(['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest']) === true) {
	                empty = false;
	            }
	        });
	        return empty;
	    }
	}

	module.exports = Grid;

/***/ },
/* 4 */
/***/ function(module, exports) {

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
	        switch (this.value) {
	            case -1:
	                display = 0;
	                break;
	            case 0:
	                display = 1;
	                break;
	            case 1:
	                display = 0;
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
	        directionsArray.forEach(function (dir) {
	            switch (dir) {
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
	                    if (cell.grid.getCell(cell.x + 1, cell.y - 1).value > 0) {
	                        hasNeighbors = true;
	                    }
	                    break;
	                case "northwest":
	                    if (cell.grid.getCell(cell.x - 1, cell.y - 1).value > 0) {
	                        hasNeighbors = true;
	                    }
	                    break;
	                case "southeast":
	                    if (cell.grid.getCell(cell.x + 1, cell.y + 1).value > 0) {
	                        hasNeighbors = true;
	                    }
	                    break;
	                case "southwest":
	                    if (cell.grid.getCell(cell.x - 1, cell.y + 1).value > 0) {
	                        hasNeighbors = true;
	                    }
	                    break;
	            }
	        });
	        return hasNeighbors;
	    }
	}

	module.exports = Cell;

/***/ },
/* 5 */
/***/ function(module, exports) {

	class Room {
	    constructor(roomData) {
	        this.x = roomData.x;
	        this.y = roomData.y;
	        this.height = roomData.height;
	        this.width = roomData.width;
	        this.grid = roomData.grid;
	        this.cells = this.pullCells();
	        this.setCellsRoomValue();
	        this.setCellsValue();
	    }

	    pullCells() {
	        var cells = this.grid.pullCells(this.x, this.y, this.width, this.height);
	        return cells;
	    }

	    getCell(x, y) {
	        return this.cells.find(function (cell) {
	            return cell.x === x && cell.y === y;
	        });
	    }

	    setCellsRoomValue() {
	        for (var i = 0; i < this.cells.length; i++) {
	            this.cells[i].room = this;
	        }
	    }

	    setCellsValue() {
	        for (var i = 0; i < this.cells.length; i++) {
	            this.cells[i].setValue(1);
	        }
	    }
	}

	module.exports = Room;

/***/ },
/* 6 */
/***/ function(module, exports) {

	class Enemy {
	  constructor(grid, cell) {
	    this.grid = grid;
	    this.cell = this.setLocation(cell);
	    this.health = 4;
	  }

	  setLocation(cell) {
	    var location = this.grid.getCell(cell.x, cell.y);
	    location.setValue(4);
	    return location;
	  }

	  hit() {
	    this.health--;
	    this.health--;
	    this.checkHealth();
	  }

	  checkHealth() {
	    if (this.health === 0) {
	      this.kill();
	      this.cell.setValue(1);
	      if (this.grid.player.health > 0) {
	        this.grid.player.score += 100;
	      }
	    }
	  }

	  kill() {
	    for (var i = 0; i < this.grid.enemies.length; i++) {
	      if (this.grid.enemies[i].cell.x === this.cell.x && this.grid.enemies[i].cell.y === this.cell.y) {
	        this.grid.enemies.splice(i, 1);
	      }
	    }
	  }

	  chase() {
	    var enemyX = this.cell.x;
	    var enemyY = this.cell.y;
	    var playerX = this.grid.player.position.x;
	    var playerY = this.grid.player.position.y;
	    var change = {
	      x: Math.min(1, Math.max(-1, playerX - enemyX)),
	      y: Math.min(1, Math.max(-1, playerY - enemyY))
	    };

	    if (change.x !== 0 && change.y !== 0) {
	      if (Math.random() > 0.5) {
	        change.x = 0;
	      } else {
	        change.y = 0;
	      }
	    }

	    var newCell = this.grid.getCell(this.cell.x + change.x, this.cell.y + change.y);
	    switch (newCell.value) {
	      case 1:
	      case 0:
	        this.cell.setValue(1);
	        this.cell = newCell.setValue(4);
	        break;
	      case -1:
	        this.grid.player.hit();
	    }
	  }
	}

	module.exports = Enemy;

/***/ },
/* 7 */
/***/ function(module, exports) {

	class DisplayHandler {
	  constructor(displayData) {
	    this.context = displayData.context;
	    this.grid = null;
	    this.tileSize = 32;
	    this.offsetX = 0;
	    this.offsetY = 0;
	    this.tiles = new Image();
	    this.tiles.src = "assets/images/tiles.png";
	    this.player = new Image();
	    this.player.src = "assets/images/hero.png";
	  }

	  setGrid(grid) {
	    this.grid = grid;
	  }

	  setCamera(camera) {
	    this.camera = camera;
	  }

	  draw() {
	    this.clear();
	    this.drawTiles();
	  }

	  clear() {
	    this.context.fillStyle = 'black';
	    this.context.fillRect(0, 0, this.grid.width * this.tileSize, this.grid.height * this.tileSize);
	  }

	  drawTile(tile, x, y, image) {
	    var tileX = tile % 8;
	    var tileY = Math.floor(tile / 8);
	    var dh = this;

	    dh.context.drawImage(image, tileX * dh.tileSize, tileY * dh.tileSize, dh.tileSize, dh.tileSize, x, y, dh.tileSize, dh.tileSize);
	  }

	  drawTiles() {
	    var dh = this;

	    var startingCell = this.grid.getCell(this.camera.x, this.camera.y);
	    this.offsetX = startingCell.x;
	    this.offsetY = startingCell.y;

	    this.grid.cells.forEach(function (cell) {
	      if (dh.camera.cellWithinView(cell)) {
	        var x = (cell.x - dh.offsetX) * dh.tileSize;
	        var y = (cell.y - dh.offsetY) * dh.tileSize;

	        dh.drawTile(0, x, y, dh.tiles);
	        if (cell.value === -1) {
	          dh.drawTile(cell.getDisplay(), x, y, dh.player);
	        } else {
	          dh.drawTile(cell.getDisplay(), x, y, dh.tiles);
	        }
	      }
	    });
	  }

	  drawSubText(text) {
	    this.context.font = "30px Arial";
	    this.context.fillStyle = 'white';
	    var xPos = this.context.canvas.width / 2 - 150;
	    var yPos = this.context.canvas.height / 2 + 50;
	    this.context.fillText(text, xPos, yPos);
	  }

	  drawStartSplash() {
	    var xPos = this.context.canvas.width / 2 - 400;
	    var yPos = this.context.canvas.height / 2;
	    this.context.fillStyle = 'black';
	    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	    this.context.font = "80px Arial";
	    this.context.fillStyle = 'red';
	    this.context.fillText("Seven Levels of Code", xPos, yPos);
	    this.drawSubText("Press Space to Begin");
	  }

	  drawGameOver() {
	    var xPos = this.context.canvas.width / 2 - 200;
	    var yPos = this.context.canvas.height / 2;
	    this.clear();
	    this.context.font = "100px Arial";
	    this.context.fillStyle = 'red';
	    this.context.fillText("You Died", xPos, yPos);
	    this.drawSubText("Press Space to Restart");
	  }

	  drawGameWon() {
	    var xPos = this.context.canvas.width / 2 - 210;
	    var yPos = this.context.canvas.height / 2;
	    this.clear();
	    this.context.font = "100px Arial";
	    this.context.fillStyle = 'green';
	    this.context.fillText("You Win!", xPos, yPos);
	    this.drawSubText("Hit Space to Refactor");
	  }
	}

	module.exports = DisplayHandler;

/***/ },
/* 8 */
/***/ function(module, exports) {

	class Camera {
	    constructor(gameEngine) {
	        this.x = 0;
	        this.y = 0;
	        this.width = 28;
	        this.height = 20;
	        this.gameEngine = gameEngine;
	    }

	    cellWithinView(cell) {
	        var inView = true;

	        if (cell.x < this.x || cell.y < this.y) {
	            inView = false;
	        }

	        if (cell.x > this.x + this.width || cell.y > this.y + this.height) {
	            inView = false;
	        }

	        return inView;
	    }

	    update() {
	        this.x = this.gameEngine.player.position.x - 12;
	        this.y = this.gameEngine.player.position.y - 8;
	        this.checkBoundConstraints();
	    }

	    checkBoundConstraints() {
	        if (this.x < 0) {
	            this.x = 0;
	        }

	        if (this.y < 0) {
	            this.y = 0;
	        }

	        if (this.y > this.gameEngine.generator.grid.height) {
	            this.y = this.gameEngine.generator.grid.height;
	        }

	        if (this.x > this.gameEngine.generator.grid.length) {
	            this.x = this.gameEngine.generator.grid.length;
	        }
	    }
	}

	module.exports = Camera;

/***/ },
/* 9 */
/***/ function(module, exports) {

	class Info {
	  constructor(gameEngine) {
	    this.game = gameEngine;
	  }

	  updateAttributes() {
	    var backgroundAudio = document.getElementById("music");
	    backgroundAudio.volume = 0.3;
	    document.getElementById("health").innerHTML = "Coder's Moral: " + this.game.player.health;
	    document.getElementById("level").innerHTML = "Floor: " + this.game.level;
	    document.getElementById("score").innerHTML = "Commits: " + this.game.player.score;
	  }

	  saveScore() {
	    var entry = {
	      floor: this.game.level,
	      score: this.game.player.score
	    };
	    var sorted = this.sortLocalStorage();
	    if (sorted.length < 5) {
	      localStorage.setItem(localStorage.length, JSON.stringify(entry));
	    } else if (entry.score > sorted[4].score) {
	      localStorage.setItem(localStorage.length, JSON.stringify(entry));
	    }
	  }

	  displayScore() {
	    if (localStorage.length > 0) {
	      var sorted = this.sortLocalStorage();
	      var formattedScores = "";
	      if (sorted.length >= 5) {
	        for (var i = 0; i < 5; i++) {
	          formattedScores += "<div>Floor: " + sorted[i].floor + " Commits: " + sorted[i].score + "</div>";
	        }
	      } else {
	        for (var j = 0; j < sorted.length; j++) {
	          formattedScores += "<div>Floor: " + sorted[j].floor + " Commits: " + sorted[j].score + "</div>";
	        }
	      }
	      document.getElementById('high-score').removeAttribute('hidden');
	      document.getElementById("score-board").innerHTML = formattedScores;
	    }
	  }

	  sortLocalStorage() {
	    var highscores = [];
	    for (var i = 0; i < localStorage.length; i++) {
	      highscores.push(JSON.parse(localStorage[i]));
	    }
	    var sorted = highscores.sort(function (a, b) {
	      return b.score - a.score;
	    });
	    return sorted;
	  }
	}

	module.exports = Info;

/***/ },
/* 10 */
/***/ function(module, exports) {

	class Player {
	  constructor() {
	    this.position = null;
	    this.grid = null;
	    this.health = 10;
	    this.score = 0;
	  }

	  setGrid(grid) {
	    this.grid = grid;
	  }

	  setEngine(engine) {
	    this.engine = engine;
	  }

	  setPosition(cell) {
	    this.position = cell;
	    cell.setValue(-1);
	    return cell;
	  }

	  determineActionByTarget(targetCell) {
	    if (targetCell.value === 1) {
	      this.position.setValue(1);
	      this.setPosition(targetCell);
	    } else if (targetCell.value === 2) {
	      this.position.setValue(1);
	      this.setPosition(targetCell);
	    } else if (targetCell.value === 3) {
	      this.position.setValue(1);
	      this.setPosition(targetCell.portalTarget);
	    } else if (targetCell.value === 4) {
	      var enemy = this.grid.enemies.find(function (enemy) {
	        return enemy.cell.x === targetCell.x && enemy.cell.y === targetCell.y;
	      });
	      enemy.hit();
	    } else if (targetCell.value === 5) {
	      this.position.setValue(1);
	      this.setPosition(targetCell);
	      this.health += 5;
	    }
	  }

	  moveRight() {
	    if (this.position.hasNeighbors(['east']) === true) {
	      var targetCell = this.grid.getCell(this.position.x + 1, this.position.y);
	      this.determineActionByTarget(targetCell);
	    }
	  }

	  moveLeft() {
	    if (this.position.hasNeighbors(['west']) === true) {
	      var targetCell = this.grid.getCell(this.position.x - 1, this.position.y);
	      this.determineActionByTarget(targetCell);
	    }
	  }

	  moveUp() {
	    if (this.position.hasNeighbors(['north']) === true) {
	      var targetCell = this.grid.getCell(this.position.x, this.position.y - 1);
	      this.determineActionByTarget(targetCell);
	    }
	  }

	  moveDown() {
	    if (this.position.hasNeighbors(['south']) === true) {
	      var targetCell = this.grid.getCell(this.position.x, this.position.y + 1);
	      this.determineActionByTarget(targetCell);
	    }
	  }

	  hit() {
	    this.health--;
	    if (this.health === 0) {
	      this.engine.info.saveScore();
	      this.engine.info.displayScore();
	    }
	  }
	}

	module.exports = Player;

/***/ }
/******/ ]);