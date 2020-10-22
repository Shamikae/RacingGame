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
let obj1 = new Image;
obj1.src = "./assets/manWalking.png";
let obj2 = new Image;
obj2.src = "./assets/womanWalking.png";
let obj3 = new Image;
obj3.src = "./assets/twoWalking.png";
let obj4 = new Image;
obj4.src = "./assets/goldDollar.png";
let obj5 = new Image;
obj5.src = "./assets/car.png"
var objArray = [obj1, obj2, obj3, obj4, obj5]
var incomingObjs = [];
var count = 0;
// let car2 = new Image;
// car2.src = "./assets/car.png";
let yOffSet = -512;
let y = 0;
let incomingY = 0;
const incomingVar = {
    leftLane: 0,
    rightLane: 0,
    speedModL: 0,
    speedModR: 0,
    mainMod: 8,
    screenBttm: 30,
    randomizer: function(num){
        return Math.floor(Math.random() * Math.floor(num));
    }
    
}
for(var i = 0; i < 200; i++){
    var randomObj = objArray[Math.floor(Math.random()* objArray.length)];
    incomingObjs.push(randomObj);

}
window.addEventListener('keydown', (event) => { 
    
    console.log(event.key, 'keyevent')
    switch (event.key) { 
        
        case 'ArrowUp' :  
            if(carY == 120) {
                carY = 120;
            }else{
                carY += 5;
            }
            break; 
        
        case 'ArrowDown' : 
            if(carY === 0){
                carY = 0;
            }else{
                carY -= 10;
            } 
            break;
        
        case 'ArrowLeft' : 
            carX -= 10; 
            break;
        
        case 'ArrowRight' : 
            carX += 10; 
            break;
  
    }
});

function incomingObjLogic(){
    // We can have a speed modifier for each lane
    // After incoming var reaches end reset and allow for randomizer
    const screenBttm = incomingVar.screenBttm;
    console.log(incomingVar.leftLane, "left")
    if(incomingVar.leftLane === 0 || incomingVar.rightLane === 0){
        incomingVar.leftLane = incomingVar.randomizer(incomingVar.mainMod);
        incomingVar.rightLane = incomingVar.randomizer(incomingVar.mainMod);
    }
    if(incomingVar.leftLane >= screenBttm){
        incomingVar.leftLane = 0;
        incomingVar.speedModL = incomingVar.randomizer(incomingVar.mainMod)
    } else {
        incomingVar.leftLane += incomingVar.speedModL;
    }

    if(incomingVar.rightLane >= screenBttm){
        incomingVar.rightLane = 0;
        incomingVar.speedModR = incomingVar.randomizer(incomingVar.mainMod);
    } else {
        incomingVar.rightLane += incomingVar.speedModR;
    }
}

function gameLoop(){
    if(yOffSet >= 0) {
        yOffSet = -512;
        count++;
    } 
    // drawImage() method draws an image, canvas, or video onto the canvas.It can also draw parts of an image, and/or increase/reduce the image size.
    ctx.drawImage(road, 0, yOffSet);
    ctx.drawImage(road, 0, yOffSet + 512);
    ctx.drawImage(road, 0, yOffSet + 1024);

    yOffSet += carY;
    
    
    incomingObjLogic();
    ctx.drawImage( car, 350 + carX, 240 + carY);
    // ctx.drawImage(car2, 770, 400)
    ctx.drawImage(incomingObjs[count], 350, incomingVar.leftLane);
    ctx.drawImage(incomingObjs[count], 600, incomingVar.rightLane);
    
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