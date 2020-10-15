let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let road = new Image;
road.src = "./assets/Group 2.png";

road.onload = () => {
    requestAnimationFrame(gameLoop);
}

let yOffSet = -512;

function gameLoop(){
    if(yOffSet>= 0) yOffSet = -512;
    
    ctx.drawImage(road, 0, yOffSet);
    ctx.drawImage(road, 0, yOffSet + 512);
    ctx.drawImage(road, 0, yOffSet + 1024);

    yOffSet += 10;
    requestAnimationFrame(gameLoop);
}