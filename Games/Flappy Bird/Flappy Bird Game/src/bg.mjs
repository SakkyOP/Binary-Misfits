export default class BackgroundPanel {
    constructor (game, x_coord, y_coord, width, height) {
        this.game = game;

        this.width = width;
        this.height = height;

        this.gameSpeed = game.gameSpeed;

        this.image = document.getElementById("bg-image");

        this.position = {
            x: x_coord,
            y: y_coord
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image,this.position.x,this.position.y, this.width, this.height);
    }

    update(deltaTime){
        this.position.x -= this.gameSpeed * 2.5;
    }
}