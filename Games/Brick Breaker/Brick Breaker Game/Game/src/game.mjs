import Ball from "./ball.mjs";
import Brick from "./brick.mjs";
import InputHandler from "./input.mjs";
import Paddle from "./paddle.mjs";
import { level1 , buildLevel, level2, levelGenerator } from "./level.mjs";

const GAMESTATE = {
    PAUSED : 0,
    RUNNING : 1,
    MENU : 2,
    GAMEOVER : 3,
    NEXTLEVEL : 4
}

export default class Game {

    constructor(WIDTH,HEIGHT){
        this.gamestate = GAMESTATE.MENU;
        this.lives = 3;

        this.width = WIDTH;
        this.height = HEIGHT;

        this.bricks = [];
        buildLevel(this,level1); // build first level

        this.paddle = new Paddle(this,"#696969");
        this.ball = new Ball(this);
        this.input = new InputHandler(this.paddle,this);

        this.levels = [level1,level2];
        this.currentLevel = 0;

        this.score = 0;
    }

    start(){

        if (this.gamestate == GAMESTATE.MENU || this.gamestate == GAMESTATE.GAMEOVER || this.gamestate == GAMESTATE.NEXTLEVEL){
            if (this.gamestate == GAMESTATE.GAMEOVER) {this.lives = 3;this.score = 0;}
            this.ball.reset();

            this.bricks = []

            this.gameObjects = [
                this.paddle,
                this.ball
            ]
            if (this.gamestate == GAMESTATE.GAMEOVER){
                this.currentLevel = 0;
            }

            buildLevel(this,this.levels[this.currentLevel]);
            this.gamestate = GAMESTATE.RUNNING;
        }
    }

    draw(ctx){
        if (this.gamestate == GAMESTATE.RUNNING || this.gamestate == GAMESTATE.PAUSED) {
            // lives

            let livesText = "";
            for (let i = 0; i < this.lives; i++){
                livesText += "❤️"
            } 
            ctx.font = "20px Arial";
            ctx.fillStyle = "rgba(255,255,255,.3)";
            ctx.textAlign = "center";
            ctx.fillText(livesText ,this.width / 2, this.height / 2 + 80);


            // game objects 

            this.gameObjects.forEach((object)=>object.draw(ctx));
            this.bricks.forEach((object)=>object.draw(ctx));
            
            
        }

        if (this.gamestate == GAMESTATE.PAUSED){
            ctx.rect(0,0,this.width,this.height);
            ctx.fillStyle = "rgba(255,255,255,.2)";
            ctx.fill();

            ctx.font = "69px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused",this.width / 2, this.height / 2);
            ctx.font = "20px Arial";
            ctx.fillText("Score: " + (this.score),this.width / 2, this.height / 2 + 40);
            ctx.font = "20px Arial";
            ctx.fillText("Lives: " + this.lives ,this.width / 2, this.height / 2 + 80);
            
        }

        if (this.gamestate == GAMESTATE.MENU){
            ctx.rect(0,0,this.width,this.height);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACE to start the game",this.width / 2, this.height / 2);
        }

        if (this.gamestate == GAMESTATE.GAMEOVER){
            ctx.rect(0,0,this.width,this.height);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER!",this.width / 2, this.height / 2);
            ctx.font = "20px Arial";
            ctx.fillText("Press SPACE to try again!",this.width / 2, this.height / 2 + 40);
            ctx.font = "40px Arial";
            ctx.fillText("Score: "+ (this.score),this.width / 2, this.height / 4);
            
        }

        if (this.gamestate == GAMESTATE.NEXTLEVEL){
            ctx.rect(0,0,this.width,this.height);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("LEVEL COMPLETE!",this.width / 2, this.height / 2);
            ctx.font = "20px Arial";
            ctx.fillText("Press SPACE to proceed to the next level!",this.width / 2, this.height / 2 + 40);
            ctx.font = "40px Arial";
            ctx.fillText("Score: "+ (this.score),this.width / 2, this.height / 4);
        }
    }

    update(deltaTime){
        if (this.lives == 0){
            this.gamestate = GAMESTATE.GAMEOVER;
        }

        if (this.gamestate === GAMESTATE.RUNNING){
            this.gameObjects.forEach((object)=>object.update(deltaTime));
            this.bricks.forEach((object)=>object.update());
            this.bricks = this.bricks.filter(object => !object.markedForDeletion)
        }
        
        if (this.bricks.length === 0 && !(this.gamestate == GAMESTATE.NEXTLEVEL)) {
            this.gamestate = GAMESTATE.NEXTLEVEL;
            this.currentLevel++;
            this.paddle.maxSpeed += this.paddle.acceleration;
            this.levels.push(levelGenerator());
        }
        
    }

    togglePause(){
        if (this.gamestate == GAMESTATE.OVER){return;}
        if (this.gamestate == GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }


}