export default class Player {
    constructor(game) {
        this.game = game;

        this.width = 34/24 * game.height * 0.04 * 1.5;
        this.height = 24/34 * game.width * 0.03 * 1.5;

        this.image = document.getElementById("bird-image");

        this.position = {
            x : 100,
            y : game.height / 2
        };

        this.velocity = {
            x : 0,
            y : 0
        }

        this.acceleration = 0.4 ;
        this.maxVelocity = 20;
        this.isjump = false;

        this.time = 0;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    jump(){
        if (!this.isjump){
            this.velocity.y -= (5);
        }
    }

    update(deltaTime){
        this.position.y += this.velocity.y / deltaTime;
        this.velocity.y +=  this.acceleration / deltaTime;

        this.time = deltaTime;

        if (this.velocity.y > (this.maxVelocity)) {
            this.velocity.y = (this.maxVelocity);
        } else if (this.velocity < -(this.maxVelocity)) {
            this.velocity.y = -(this.maxVelocity)-10;
        }
    } 
}