let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let road = new Image;
road.src = "./assets/Group 2.png";

road.onload = () => {
// window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
    requestAnimationFrame(gameLoop);
}
// Must load image before calling the drawImage() method. To ensure that the image has been loaded, you can call drawImage() from window.onload() or from document.getElementById("imageID").onload.
let car = new Image;
car.src = "./assets/car1.png";
car.className = "testing";
let modifier = 5; 
let carY = 0;
let carX = 0;
// let car2 = new Image;
// car2.src = "./assets/car.png";
let yOffSet = -512;

window.addEventListener('keydown', (event) => { 
    // const { style } = car; 
    // console.log(style.top,'car top')
    console.log(event.key, 'keyevent')
    switch (event.key) { 
        // case 'ArrowUp' : style.top = `${parseInt(style.top) - modifier}px` ; break; 
        case 'ArrowUp' :  
            if(carY == 120) {
                carY = 120;
            }else{
                carY += 5;
            }
            break; 
        // case 'ArrowDown' : style.top = `${parseInt(style.top) + modifier}px`; break;
        case 'ArrowDown' : 
            if(carY === 0){
                carY = 0;
            }else{
                carY -= 10;
            } 
            break;
        // case 'ArrowLeft' : style.left = `${parseInt(style.left) - modifier}px`; break;
        case 'ArrowLeft' : 
            carX -= 10; 
            break;
        // case 'ArrowRight' : style.left = `${parseInt(style.left) + modifier}px`; break;
        case 'ArrowRight' : 
            carX += 10; 
            break;
  
    }
});

function gameLoop(){
    if(yOffSet>= 0) yOffSet = -512;
    // drawImage() method draws an image, canvas, or video onto the canvas.It can also draw parts of an image, and/or increase/reduce the image size.
    ctx.drawImage(road, 0, yOffSet);
    ctx.drawImage(road, 0, yOffSet + 512);
    ctx.drawImage(road, 0, yOffSet + 1024);

    yOffSet += carY;
    
    
    ctx.drawImage(car, 350 + carX, 240 + carY);
    // ctx.drawImage(car2, 770, 400)
    
    requestAnimationFrame(gameLoop);
}

// function draw() {
//     ctx.clearRect(0,0, canvas.clientWidth, canvas.height );
//     if (rightPressed) {
//         X += 5;
//     }
//     else if (leftPressed) {
//         X -= 5;
//     }
//     else if (upPressed) {
//         Y -= 5;
//     }
//     ctx.drawImage(car, X, Y);
//     requestAnimationFrame(draw);
// }