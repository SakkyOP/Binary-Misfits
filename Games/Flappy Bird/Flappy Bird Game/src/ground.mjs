export default class GroundPanel{
    constructor(game,x_coord,panelWidth,panelHeight){
        this.width = panelWidth;
        this.height = panelHeight/5;

        this.game = game;

        this.position = {
            x: x_coord,
            y: game.height - this.height
        };

        this.velocity = {
            x : 5,
            y : 0
        };

        this.image = document.getElementById("ground-image");
    }

    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y, this.width, this.height)
    }

    update(deltaTime) {
        this.position.y = this.game.panels[1].height/5 * 4;
        this.height = this.game.panels[1].height/5;

        this.position.x -= this.game.gameSpeed * this.velocity.x;
    }
}
