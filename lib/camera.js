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

        if(cell.x < this.x || cell.y < this.y) {
            inView = false;
        }

        if(cell.x > this.x + this.width || cell.y > this.y + this.height) {
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
    if(this.x < 0) {
        this.x = 0;
    }

    if(this.y < 0) {
        this.y = 0;
    }

    if(this.y > this.gameEngine.generator.grid.height) {
        this.y = this.gameEngine.generator.grid.height;
    }

    if(this.x > this.gameEngine.generator.grid.length) {
        this.x = this.gameEngine.generator.grid.length;
    }
    }
}

module.exports = Camera;