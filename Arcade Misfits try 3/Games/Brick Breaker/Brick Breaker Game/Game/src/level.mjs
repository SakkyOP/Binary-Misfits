import Brick from "./brick.mjs";

export function buildLevel(game,level) {
    
    level.forEach((row,rowIndex) => {
        row.forEach((brick, brickIndex)=>{
            if (brick==1) {
                let position = {
                    x : 40 + brickIndex * 60 ,
                    y : 20 + rowIndex * 30
                }
                game.bricks.push(new Brick(game, position));
            }
        });
    });
}


// 12 x 7 map

export function levelGenerator(){
    var level = []
    for (let i = 0; i < 7; i++){
        var temp = []
        for (let j = 0; j < 12; j++) {
            temp.push(Math.floor(Math.random()*2));
        }
        level.push(temp);
    }
    console.log(level);
    return level;
}


export const level1 = [
    [1,0,1,0,1,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1]
]

export const level2 = [
    [0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1]   
]