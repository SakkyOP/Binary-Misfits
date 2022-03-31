import GameHandler from "./game.mjs";
// import responsiveCanvas from "./responsive.mjs";

let canvas = document.getElementById("gameScreen");

let WIDTH = canvas.getAttribute("width"), HEIGHT = canvas.getAttribute("height");
// Importing sprites

// let bird = document.getElementById("bird-image");
// let ground = document.getElementById("ground-image");

let ctx = canvas.getContext("2d");

// responsiveCanvas(canvas);
WIDTH = canvas.getAttribute("width"), HEIGHT = canvas.getAttribute("height");


let game = new GameHandler(WIDTH,HEIGHT);

let lastTime = 0;

function gameLoop (timeStamp) {
    // responsiveCanvas(canvas);
    WIDTH = canvas.getAttribute("width"), HEIGHT = canvas.getAttribute("height");
    game.width = WIDTH, game.height = HEIGHT;

    let deltaTime = (timeStamp - lastTime)* 0.1;
    lastTime = timeStamp;
   
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    game.draw(ctx);
    game.update(deltaTime);
    requestAnimationFrame(gameLoop); // Run function (give time as well) when next frame is ready
}

requestAnimationFrame(gameLoop);