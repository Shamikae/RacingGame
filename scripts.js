let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let road = new Image;
road.src = "./assets/GameRaod.png";

road.onload = () => {
// window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
    requestAnimationFrame(gameLoop);
}
// Must load image before calling the drawImage() method. To ensure that the image has been loaded, you can call drawImage() from window.onload() or from document.getElementById("imageID").onload.
let car = new Image;
car.src = "./assets/car1.png";
car.className = "testing";
car.width = 60;
car.height = 110;
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
let pause = false;
// let car2 = new Image;
// car2.src = "./assets/car.png";
let yOffSet = -10;
let y = 0;
let incomingY = 0;
const incomingVar = {
    width: 60,
    height: 90,
    leftLane: 1,
    rightLane: 5,
    laneLx: 400,
    laneRx: 650,
    speedModL: 0,
    speedModR: 0,
    mainMod: 5,
    screenBttm: 670,
    randomizer: function(num){
        return Math.floor(Math.random() * num);
    }
}

for(var i = 0; i < 200; i++){
    var randomObj = objArray[Math.floor(Math.random()* objArray.length)];
    incomingObjs.push(randomObj);

}
window.addEventListener('keydown', (event) => { 
    
    // console.log(event.key, 'keyevent')
    switch (event.key) { 
        
        case 'ArrowUp' :  
            if(carY == 20) {
                carY = 20;
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

        case 'p' : 
            pause = !pause;
            break;
  
    }
});

function incomingObjLogic(){
    // We can have a speed modifier for each lane
    // After incoming var reaches end reset and allow for randomizer
    const screenBttm = incomingVar.screenBttm;

    if(incomingVar.speedModL === 0 || incomingVar.speedModR === 0){
        incomingVar.speedModR = incomingVar.randomizer(incomingVar.mainMod) + 1;
        incomingVar.speedModL = incomingVar.randomizer(incomingVar.mainMod) + 1;
    }


    if(incomingVar.leftLane >= screenBttm){
        incomingVar.leftLane = 0;
        incomingVar.speedModL = incomingVar.randomizer(incomingVar.mainMod);
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
function collision(){
    
// console.log( `check right${carX + car.width + 450 - incomingVar.laneLx - 30}`)
// console.log(`check left ${carX + 450 - incomingVar.laneLx + incomingVar.width - 110}`)
// console.log(  carX + car.width + 330 - incomingVar.laneLx + incomingVar.width )
        if(
            (carX + car.width - incomingVar.laneLx + 440 >= 0 && 
            carX + car.width - incomingVar.laneLx + incomingVar.width + 390 <= 0) 
            // || (carX - incomingVar.laneLx + 440 >= 0 && 
            //     carX - incomingVar.laneLx + incomingVar.width + 390 <= 0)
            // carX + car.width - incomingVar.laneLx + incomingVar.width+ 330 <= 0  
            // carX + 450 >= incomingVar.laneLx + incomingVar.width -110
            //   &&  
            // carY + car.height + 400 < incomingVar.leftLane &&
            // carY + 400 > incomingVar.leftLane + incomingVar.height
              ){
            console.log(carX + car.width - incomingVar.laneLx)
        }
        //     if(carX == objX && carY == objY) {
        //         alert('game over')
            
        // }
    
}
function gameLoop(){
    if(pause === true){
        return;
    }
    if(yOffSet >= 0) {
        yOffSet = -680;
        count++;
    } 
    // drawImage() method draws an image, canvas, or video onto the canvas.It can also draw parts of an image, and/or increase/reduce the image size.
    ctx.drawImage(road, 0, yOffSet);
    ctx.drawImage(road, 0, yOffSet + 10);
    ctx.drawImage(road, 0, yOffSet + 688);

    yOffSet += carY;
    
    
    incomingObjLogic();
    ctx.drawImage( car, 450 + carX, 400 + carY, car.width, car.height);
    ctx.drawImage(incomingObjs[count], incomingVar.laneLx, incomingVar.leftLane, incomingVar.width, incomingVar.height);
    ctx.drawImage(incomingObjs[count], incomingVar.laneRx, incomingVar.rightLane, incomingVar.width, incomingVar.height);
    collision();
    requestAnimationFrame(gameLoop);
}
