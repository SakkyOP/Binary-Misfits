export default class Pipe {
    constructor (game,x_coord) {
        this.game = game; 
        this.width = 53;
        this.height = 320;

        this.image = document.getElementById("pipe-image");
        this.inverted_image = document.getElementById("pipe-image-inverted");

        // if (game.width > game.height) {
        //     var Yoffeset = (Math.floor((Math.random()*20)-1)*10);// -10 to +180
        // } else { 
        //     var Yoffeset = (Math.floor((Math.random()*20)-12)*10);//-240 to 120
        // }
        
        this.position = {
            x : x_coord,
            y : game.height - this.height + (Math.floor((Math.random()*20)-1)*10) // - this.height + (Math.floor((Math.random()*20)-1)*10)
        };

        this.velocity = {
            x : 5,
            y : 0
        };
    }

    draw(ctx) {
        // ctx.drawImage(this.inverted_image, this.position.x, this.position.y + this.height, this.width, this.height);
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(this.inverted_image, this.position.x, this.position.y - this.height - 100, this.width, this.height);
        // ctx.drawImage(this.image, this.position.x, this.position.y - (this.height * 2) - 80, this.width, this.height);
    }

    update(deltaTime) {
        this.position.x -= this.velocity.x * this.game.gameSpeed;
    }

    collision() {
        let upperEdge = this.position.y - 100;
        let lowerEdge = this.position.y;
        let rightEdge = this.position.x + this.width + this.velocity.x * this.game.gameSpeed;
        let leftEdge = this.position.x + this.velocity.x * this.game.gameSpeed;

        let birdTop = this.game.player.position.y + 5;
        let birdBottom = this.game.player.position.y + this.game.player.height - 5;
        let birdLeft = this.game.player.position.x + 5;
        let birdRight = this.game.player.position.x + this.game.player.width - 5;

        return ((birdRight > leftEdge &&  birdLeft < rightEdge) && (birdBottom > lowerEdge || birdTop < upperEdge));
    }
}