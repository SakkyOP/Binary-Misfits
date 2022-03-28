
export default class Brick{
    constructor(game,position){
        this.game = game;

        this.width = 60;
        this.height = 30;

        this.position = position

        this.image = document.getElementById("brick");

        this.markedForDeletion = false;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        if (this.collision()){
            this.markedForDeletion = true;
            this.game.score += 10;
        }
    }

    collision(){
        let topBoundary = this.position.y;
        let bottomBoundary = this.position.y + this.height;
        let leftBoundary = this.position.x;
        let rightBoundary = this.position.x + this.width;
        let quarterX = this.position.x + (this.width / 5);
        let thirdQuarterX = this.position.x + this.width - this.width / 5;

        let ballTop = this.game.ball.position.y;
        let ballBottom = this.game.ball.position.y + this.game.ball.height;
        let ballLeft = this.game.ball.position.x;
        let ballRight = this.game.ball.position.x + this.game.ball.width;

        if ((ballBottom >= topBoundary && ballTop <= bottomBoundary) && (ballRight >= leftBoundary && ballLeft <= rightBoundary)){
            if (ballLeft < quarterX &&
            ballRight >= leftBoundary &&
            ballRight < quarterX){
                if (this.game.ball.velocity.x > 0){
                    this.game.ball.velocity.x = -this.game.ball.velocity.x;
                }
            } else if (ballRight > thirdQuarterX &&
            ballLeft <= rightBoundary &&
            ballLeft > thirdQuarterX) {
                if (this.game.ball.velocity.x < 0){
                    this.game.ball.velocity.x = -this.game.ball.velocity.x;
                }
            }
            this.game.ball.velocity.y = -this.game.ball.velocity.y;
            return true;
        }
        return false;
    }
}