let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let road = new Image;
road.src = "./assets/Group 2.png";

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
// Key pressed
document.addEventListener("keydown", keyDownHandler, false);
// Key press finished
document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.key == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.key == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
}

// function mouseMoveHandler(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX - paddleWidth/2;
//     }
// }

road.onload = () => {
// window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
    requestAnimationFrame(gameLoop);
}
// Must load image before calling the drawImage() method. To ensure that the image has been loaded, you can call drawImage() from window.onload() or from document.getElementById("imageID").onload.
let car = new Image;
car.src = "./assets/car1.png";

// let car2 = new Image;
// car2.src = "./assets/car.png";


let yOffSet = -512;

function gameLoop(){
    if(yOffSet>= 0) yOffSet = -512;
    // drawImage() method draws an image, canvas, or video onto the canvas.It can also draw parts of an image, and/or increase/reduce the image size.
    ctx.drawImage(road, 0, yOffSet);
    ctx.drawImage(road, 0, yOffSet + 512);
    ctx.drawImage(road, 0, yOffSet + 1024);

    yOffSet += 10;
    ctx.drawImage(car, 490, 400);
    // ctx.drawImage(car2, 770, 400)
    requestAnimationFrame(gameLoop);
}

function draw() {
    ctx.clearRect(0,0, canvas.clientWidth, canvas.height );
    if (rightPressed) {
        X += 5;
    }
    else if (leftPressed) {
        X -= 5;
    }
    else if (upPressed) {
        Y -= 5;
    }
    ctx.drawImage(car, X, Y);
    requestAnimationFrame(draw);
}