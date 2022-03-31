import BackgroundPanel from "./bg.mjs";
import Player from "./bird.mjs";
import GroundPanel from "./ground.mjs";
import InputHandler from "./input.mjs";
import Pipe from "./pipes.mjs";

const GAMESTATE = {
    RUNNING: 0,
    PAUSE: 1,
    MENU: 2,
    OVER: 3
}

export default class GameHandler{
    constructor(gameWidth, gameHeight){
        this.width = gameWidth;
        this.height = gameHeight;

        this.panels = [];
        this.groundPanels = [];
        this.pipes = []
        this.input = new InputHandler(this);
        
        this.gamestate = GAMESTATE.MENU;
        this.start();
    }

    start() {
        if (this.gamestate == GAMESTATE.MENU || this.gamestate == GAMESTATE.OVER){
            this.player = new Player(this);
            if (this.gamestate == GAMESTATE.OVER){
                this.pipes = [];
                this.panels = [];
                this.groundPanels = [];
                this.gameObjects = [];
            }
            this.gameSpeed = 0.5;
            this.tempscore = 0;
            this.score = 0;
            var calc_panel_width = (288 / 512) * this.height; 
            for(let i = 0; i < Math.ceil(this.width/calc_panel_width)+2; i++){
                let panel = new BackgroundPanel(this, calc_panel_width*i, 0, calc_panel_width, this.height);
                let g_panel = new GroundPanel(this,calc_panel_width*i,panel.width,panel.height);            
                this.panels.push(panel);
                this.groundPanels.push(g_panel);
                this.pipes.push(new Pipe(this, (this.width/3)*(i+2)));
            }
            this.gameObjects = [...this.panels, this.player, ...this.pipes, ...this.groundPanels];
        }
    }  
    togglePause(){
        if (this.gamestate == GAMESTATE.RUNNING) {
            this.gamestate = GAMESTATE.PAUSE; 
        } else if (this.gamestate == GAMESTATE.PAUSE){
            this.gamestate = GAMESTATE.RUNNING;
        }
    }
    draw(ctx){
        this.gameObjects.forEach(object=>{
            object.draw(ctx);
        });

        ctx.font = "20px Minecraft";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Score: "+this.score,this.width / 2, this.height / 10);

        if (this.gamestate == GAMESTATE.MENU){
            ctx.font = "80px Minecraft";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Flappy Bird",this.width / 2, this.height / 2 );

            ctx.font = "20px Minecraft";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACE to start the game",this.width / 2, (this.height / 2 )+ 40); 
        }
        if (this.gamestate == GAMESTATE.PAUSE){

            ctx.font = "69px Minecraft";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused",this.width / 2, this.height / 2);
        }

        if (this.gamestate == GAMESTATE.OVER){
            ctx.font = "69px Minecraft";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER!",this.width / 2, this.height / 2);
            ctx.font = "20px Minecraft";
            ctx.fillText("Press SPACE to try again!",this.width / 2, this.height / 2 + 40);
        }
    }

    update(deltaTime){
        if (!this.gamestate==GAMESTATE.RUNNING){return;}
        this.gameObjects.forEach(object => {
            object.update(deltaTime);

            if (object.position.x + object.width < 0){
                this.gameObjects.markedForDeletion = true;
            }
        });

        if (this.panels.length <= Math.ceil(this.width/this.panels[0].width)+2){
            let newpanel = new BackgroundPanel(this, this.panels[this.panels.length-1].position.x + this.panels[0].width, 0, this.panels[0].width, this.height);
            this.panels.push(newpanel);
        }

        if (this.pipes.length < 4){
            this.pipes.push(new Pipe(this, (this.width/3)*this.pipes.length + (this.width/3)));
        }

        if (this.groundPanels.length < 6){
            this.groundPanels.push(new GroundPanel(this,this.groundPanels[this.groundPanels.length-1].position.x + this.groundPanels[this.groundPanels.length-1].width, this.groundPanels[this.groundPanels.length-1].width, this.groundPanels[this.groundPanels.length-1].height));
        }

        this.panels.forEach((panel, panelIndex )=> {
            var calc_panel_width = (288 / 512) * this.height;

            // background panel responsiveness

            // window.addEventListener("resize",()=>{
            //     panel.width = calc_panel_width, panel.height = this.height;
            //     panel.position.x = calc_panel_width * panelIndex;
            //     while (this.panels.length <= Math.ceil(this.width/calc_panel_width)+2){
            //         let newpanel = new BackgroundPanel(this, this.panels[this.panels.length-1].position.x + calc_panel_width, 0, calc_panel_width, this.height);
            //         this.panels.push(newpanel);
            //     }
            // });
            
            // remove panels that are out of screen and add new ones

            if (panel.position.x + panel.width <= 0){
                if (this.panels.length <= Math.ceil(this.width/calc_panel_width)+2){
                    let newpanel = new BackgroundPanel(this, this.panels[this.panels.length-1].position.x + calc_panel_width, 0, calc_panel_width, this.height);
                    this.panels.push(newpanel);
                }
                this.panels.shift();
            }
        });

        this.pipes.forEach(pipe=>{

            if (pipe.position.x < (this.width/4)*3 && this.pipes.length < 4){
                this.pipes.push(new Pipe(this, (this.width/3)*this.pipes.length + (this.width/3)));
            }

            if (pipe.position.x + pipe.width < 0){
                this.pipes.shift();
            }

            if (pipe.position.x + pipe.width < this.player.position.x && pipe.position.x + pipe.width > this.player.position.x - 2){
                this.score += 10;
            }
        });

        this.groundPanels.forEach(panel => {

            // window.addEventListener("resize",()=>{
            //     while (this.groundPanels.length <= Math.ceil(this.width/panel.width)+2){
            //         let newpanel = new GroundPanel(this, this.groundPanels[this.groundPanels.length - 1].position.x + panel.width, panel.width, panel.height);
            //         this.groundPanels.push(newpanel);
            //     }
            // });

            if (panel.position.x + panel.width <= 0) {
                let newpanel = new GroundPanel(this, this.groundPanels[this.groundPanels.length - 1].position.x + panel.width, panel.width, panel.height);
                this.groundPanels.push(newpanel);
                this.groundPanels.shift();

            }
        });

        if (this.pipes[0].collision()){
            this.gamestate = GAMESTATE.OVER;
        }

        if (this.player.position.y + this.player.height > this.groundPanels[0].position.y){
            this.gamestate = GAMESTATE.OVER;
        }

        this.gameObjects = [...this.panels, this.player, ...this.pipes, ...this.groundPanels];
        this.gameObjects = this.gameObjects.filter(object=>{
            return !object.markedForDeletion;
        });

        // this.tempscore += Math.ceil(this.gameSpeed);

        // this.score = Math.floor(this.tempscore / 10);

        this.gameSpeed += 1 / 10000;
    }
}