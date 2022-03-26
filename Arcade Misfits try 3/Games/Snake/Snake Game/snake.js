const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 5;
let tilescount = 20;
let tilesize = (canvas.width / tilescount)-2;

//Snake Body
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

//Snake Velocity
let X_Velocity = 0;
let Y_Velocity = 0;

//Food Pos
let foodX = 5;
let foodY = 5;

//Score
let score = 0;

//Sound
const eatingSound = new Audio("eat.mp3");
const gameover = new Audio("gameover.wav")


// GAME LOOP
function drawWorld(){
    changeSnakePosi();

    let result = isGameOver();
    if(result){
        return;
    }
    if(score >= 10){
        speed = 6;
    }
    clearScreen();
    checkFoodCollision();
    drawFood();
    drawSnake();

    drawScore();

    setTimeout(drawWorld, 1000 / speed);

}

function isGameOver(){
    let gameOver = false;

    if(X_Velocity ===0 && Y_Velocity ===0){
        return false;
    }

    //walls
    if(headX < 0 ) {
        gameOver = true;
    }
    if(headX >= tilescount) {
        gameOver = true;
    }
    if(headY < 0) {
        gameOver = true;
    }
    if(headY >= tilescount) {
        gameOver = true;
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }


    if(gameOver){
        ctx.fillStyle = "red";
        ctx.font = "42px Montserrat";
        ctx.fillText("GAME OVER!" , canvas.width/5.8, canvas.height/2);
        ctx.font = "20px Montserrat";
        ctx.fillText("Press 'F5' to Restart Game." , canvas.width/4.2, canvas.height/1.7);
        gameover.play();
    }
    
    return gameOver;



}


// Clears Screen or Update Screen
function clearScreen(){
    ctx.fillStyle = "#191819";
    ctx.fillRect(0,0,canvas.width, canvas.height);
}


// Snake Draw
function drawSnake(){
    ctx.fillStyle = "green";
    ctx.fillRect(headX*tilescount, headY*tilescount, tilesize,tilesize);
    ctx.fillStyle = "yellow";
    for(i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x*tilescount, part.y*tilescount, tilesize, tilesize);
    }

    snakeParts.push(new SnakePart(headX,headY));
    while(snakeParts.length > tailLength){
        snakeParts.shift();
    }
}

// Score
function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "16px Montserrat";
    ctx.fillText("SCORE: " + score, canvas.width-84,20);

}

// Snake Pos
function changeSnakePosi(){
    headX = headX + X_Velocity;
    headY = headY + Y_Velocity;
}

// Food Draw
function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(foodX* tilescount, foodY* tilescount, tilesize, tilesize);
}


// Food Collision with snake
function checkFoodCollision(){
    if(foodX === headX && foodY === headY){
        foodX = Math.floor(Math.random() * tilescount); // we are using floor not round because if 9.6 comes it will make it 10 which will be out of bounds. 
        foodY = Math.floor(Math.random() * tilescount);
        tailLength++;
        score++;
        eatingSound.play();
    }
}





// Snake Controll
document.body.addEventListener('keydown', keyDown);
function keyDown(event){

    // For UP_ARROW-key
    if(event.keyCode == 38 || event.keyCode == 87){
        if(Y_Velocity == 1){
            return;
        }
        X_Velocity = 0;
        Y_Velocity = -1;
    }

    // For Down_ARROW-key
    if(event.keyCode == 40|| event.keyCode == 83){
        if(Y_Velocity == -1){
            return;
        }
        X_Velocity = 0;
        Y_Velocity = 1;
    }

    // For Left_ARROW-key
    if(event.keyCode == 37|| event.keyCode == 65){
        if(X_Velocity == 1){
            return;
        }
        X_Velocity = -1;
        Y_Velocity = 0;
    }

    // For Left_ARROW-key
    if(event.keyCode == 39|| event.keyCode == 68){
        if(X_Velocity == -1){
            return;
        }
        X_Velocity = 1;
        Y_Velocity = 0;
    }
}

drawWorld();