export default class Paddle {
    constructor(game, color = "#000000"){
        this.game = game

        this.width = 150;
        this.height = 30;

        this.right = false;
        this.left = false;

        this.maxSpeed = 10;
        this.speed = 0;

        this.color = color;
        this.position = {
            x: (this.game.width / 2 - this.width / 2 ),
            y: (this.game.height - this.height - 20) // gameHeight touches bottom - this height means the object touches bottom - 10 means 10px above the bottom
        };
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y , this.width, this.height);
    }
    moveLeft(){
        this.left = true;
        this.right = false;
    }
    moveRight(){
        this.left = false;
        this.right = true;
    }

    stop(){
        if (this.speed != 0){
            this.speed = 0;
            this.right = false;
            this.left = false;
        }
    }

    reset() {
        this.maxSpeed = 5;
        this.acceleration = 0;
    }

    update(deltaTime) {
        switch(true){
            case this.right:
                this.speed = this.maxSpeed;
                break;
            case this.left:
                this.speed = -this.maxSpeed;
                break;
        }

        this.position.x += this.speed * deltaTime / deltaTime;

        this.acceleration = this.game.currentLevel;
        
        // wall collision
        if (this.position.x<0) { 
            this.position.x = 0;
        } else if (this.position.x+this.width > this.game.width){ 
            this.position.x = this.game.width - this.width;
        }
    }
}
