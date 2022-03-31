export default class InputHandler {
    constructor(game) {
        document.addEventListener("keydown",event =>{

            switch(event.key){
                
                case "Escape":
                    game.togglePause();
                    break;
                case " ":
                    if (!(game.gamestate == 2)){
                        game.start();
                    }
                    game.gamestate = 0;
                    game.player.jump();
                    game.player.isjump = true;
                    break;
                case "ArrowUp":
                    game.player.jump();
                    game.player.isjump = true;
                    break;
            }
        });

        document.addEventListener("keyup",event =>{
            switch(event.key){
                case " ":
                    game.player.isjump = false;
                    break;
                case "ArrowUp":
                    game.player.isjump = false;
                    break;
            }
        });
    }
}