export default class Ball{
    constructor(game){
        this.image = document.getElementById("ball");
        this.width = 16;
        this.height = 16;

        this.game = game;
        
        this.position = {
            x : 0,
            y : 0 
        };

        this.velocity = {
            x : 0,
            y : 0
        };

        this.reset();
    }
    reset () {
        this.position = {
            x : this.game.paddle.position.x + this.game.paddle.width/2,
            y : this.game.paddle.position.y - 20 
        };

        this.velocity = {
            x : Math.pow(-1,Math.floor(Math.random())) * Math.floor(Math.random() * (5-3)+3) + (this.game.currentLevel * 0.5),
            y : Math.floor(Math.random() * (5-3)+3) -8 - (this.game.currentLevel * 0.5)
        };
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    update(deltaTime){
        this.position.x += this.velocity.x * deltaTime / deltaTime ;
        this.position.y += this.velocity.y * deltaTime / deltaTime ;

        // wall collision - velocity change
        if (this.position.x+this.width > this.game.width || this.position.x < 0) {
            this.velocity.x = -this.velocity.x;
        } else if (this.position.y < 0) {
            this.velocity.y = -this.velocity.y;
            this.position.y = 0
        }
        // wall collision - position reset
        if (this.position.x<0) { 
            this.position.x = 0;
        } else if (this.position.x+this.width > this.game.width){ 
            this.position.x = this.game.width - this.width;
        }
        if (this.collision(this.game.paddle)){
            if (this.velocity.y > 0){
                this.velocity.y = -this.velocity.y;
            }
        }
        
        if (this.position.y+this.height > this.game.height){
            setTimeout(()=>{
                this.reset();
            },1000);
            this.game.lives --;
            this.position = {
                x : this.game.paddle.position.x + this.game.paddle.width/2,
                y : this.game.paddle.position.y - 20 
            };
            this.velocity = {
                x : 0,
                y : 0
            }
        }

    }
    collision(object){
        let topBoundary = object.position.y;
        let bottomBoundary = object.position.y + object.height;
        let leftBoundary = object.position.x;
        let rightBoundary = object.position.x + object.width;
        let quarterX = object.position.x + (object.width / 5);
        let thirdQuarterX = object.position.x + object.width - object.width / 5;

        let ballTop = this.position.y;
        let ballBottom = this.position.y + this.height;
        let ballLeft = this.position.x;
        let ballRight = this.position.x + this.width;
        
        if ((ballBottom >= topBoundary && ballTop <= bottomBoundary) && (ballRight >= leftBoundary && ballLeft <= rightBoundary)){
            
            if (ballLeft < quarterX &&
            ballRight >= leftBoundary &&
            ballRight < quarterX){
                if (this.velocity.x > 0){
                    this.velocity.x = -this.velocity.x;
                }
            } else if (ballRight > thirdQuarterX &&
            ballLeft <= rightBoundary &&
            ballLeft > thirdQuarterX) {
                if (this.velocity.x < 0){
                    this.velocity.x = -this.velocity.x;
                }
            } 
            return true;
        }
        return false;
    }
}