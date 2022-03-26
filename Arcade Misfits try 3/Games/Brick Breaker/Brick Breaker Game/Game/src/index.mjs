import Game from "./game.mjs";

const WIDTH = 800, HEIGHT = 600;

let canvas = document.querySelector("#GameScreen");
let ctx = canvas.getContext('2d');

ctx.clearRect(0,0,800,600);

let game = new Game(WIDTH,HEIGHT);

let lastTime = 0;

function gameLoop (timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp; 

    ctx.clearRect(0,0,800,600);
    game.draw(ctx);
    game.update(deltaTime);

    requestAnimationFrame(gameLoop); // Run function (give time as well) when next frame is ready
}

requestAnimationFrame(gameLoop);