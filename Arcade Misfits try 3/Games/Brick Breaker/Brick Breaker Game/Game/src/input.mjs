
export default class InputHandler {
    constructor(paddle,game) {
        document.addEventListener("keydown", (event)=>{
            switch (event.key) {
                case "d":
                    paddle.moveRight();
                    break;
                case "a":
                    paddle.moveLeft();
                    break;
                case "ArrowRight":
                    paddle.moveRight();
                    break;
                case "ArrowLeft":
                    paddle.moveLeft();
                    break;
                case "Escape":
                    game.togglePause();
                    break;
                case " ":
                    game.start();
                    break;
            }
        });
        document.addEventListener("keyup", (event)=>{
            paddle.stop();
        });
    }
}