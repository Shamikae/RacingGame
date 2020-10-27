let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let timeLeft = 15;
const timeDisplay = document.querySelector('.time')

document.getElementById('startGame').addEventListener('click',function startGame(){


    //Removes image after click 
    let parent = document.getElementById('Parent');
    let child = document.getElementById('startGame');
    parent.removeChild(child)

    
    console.log('countdown')
    countDown();
});


const scoreNode = document.querySelector(".score-num");
const timeNode = document.querySelector(".time");

let road = new Image;
road.src = "./assets/GameRoad.png";

road.onload = () => {
// window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
    requestAnimationFrame(gameLoop);
}
// Must load image before calling the drawImage() method. To ensure that the image has been loaded, you can call drawImage() from window.onload() or from document.getElementById("imageID").onload.

let obj1 = new Image;
obj1.src = "./assets/manWalking.png";
obj1.alt = "man-walking";
let obj2 = new Image;
obj2.src = "./assets/womanWalking.png";
obj2.alt = "woman-walking";
let obj3 = new Image;
obj3.src = "./assets/twoWalking.png";
obj3.alt = "two-walking";
let obj4 = new Image;
obj4.src = "./assets/goldDollar.png";
obj4.alt = "gold-dollar";
let obj5 = new Image;
obj5.src = "./assets/car.png"
obj5.alt = "car";

var objArray = [obj1, obj2, obj3, obj4, obj5]
var incomingObjs = [];
var count = 0;
let pause = false;

let yOffSet = -10;


function randomizer(num){
    return Math.floor(Math.random() * num);
}
const gameMisc = {
    bttmOfScreenY: 650
}

document.addEventListener('DOMContentLoaded', () => {
    
    const startBtn = document.querySelector('#startGame')
    
    startBtn.addEventListener('click', countDown)
    

    
})
function countDown(){
    

    let num = setInterval(function(){
        if(timeLeft <= 0 ) {
            clearInterval(num)
            alert(`Game over, your score is ${scoreNode.innerText}`)
                
                window.location.reload();
            
            
        }
        timeDisplay.innerHTML = timeLeft
        timeLeft -=1

    }, 1000)
    
}

// function Scoreboard(game){
//     this.game = game;
//     this.timeMeter = document.querySelector(".time-meter .time");
//     this.startTime = Date.now();

//     function updateTime(){
//         let timeElapsed = Date.now() - this.startTime;
//         this.timeMeter.innerHTML = timeElapsed;
//     }
// }



function Car(img, x, y, width, height, rx = null, lx = null, ty = null, by = null){
    this.rx = rx;
    this.lx = lx;
    this.x = x;
    this.ty = ty;
    this.by = by;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
}

function Obstacle(img, x, y, width, height, speedMod, mainMod, rx = null, lx = null, ty = null, by = null){
    this.rx = rx;
    this.lx = lx;
    this.x = x;
    this.ty = ty;
    this.by = by;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.speedMod = speedMod;
    this.mainMod = mainMod;
    this.appears = true;
}

function updateCar(car, x, y){
    car.rx = car.x + (car.width/2);
    car.lx = car.x - (car.width/2);
    // car.x = x;
    car.ty = car.y - (car.height/2);
    car.by = car.y + (car.height/2);
    // car.y = y;
}

function updateObstacle(obstacle){
    obstacle.rx = obstacle.x + (obstacle.width/2);
    obstacle.lx = obstacle.x - (obstacle.width/2);
    obstacle.ty = obstacle.y - (obstacle.height/2);
    obstacle.by = obstacle.y + (obstacle.height/2);
}

for(var i = 0; i < 200; i++){
    var randomObj = objArray[Math.floor(Math.random()* objArray.length)];
    incomingObjs.push(randomObj);

}

let car = new Image;
car.src = "./assets/car1.png";
car.className = "testing";

////////////////// CREATING INSTANCES (OBJECTS) FROM CLASSES (TEMPLATES) ///////////////////////

const player1 = new Car(car, 550, 500, 60, 100);

const leftObstacle = new Obstacle(objArray[Math.floor(Math.random() * objArray.length)], 450, 0, 60, 90, 0, 5);

const rightObstacle = new Obstacle(objArray[Math.floor(Math.random() * objArray.length)], 650, 0, 60, 90, 0, 5);

// const timer = new Scoreboard(startTime);
///////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener('keydown', (event) => { 
    // console.log(event.key, 'keyevent')
    // In herer might need to update obstacle logic ->
    switch (event.key) { 
        case 'ArrowUp' :  
            if(player1.y == 20) {
                player1.y = 420;
            }else{
                player1.y += 5;
            }
            break; 
        
        case 'ArrowDown' : 
            if(player1.y === 500){
                player1.y = 500;
            }else{
                player1.y -= 10;
            } 
            break;
        
        case 'ArrowLeft' : 
            player1.x -= 10; 
            break;
        
        case 'ArrowRight' : 
            player1.x += 10; 
            break;

        case 'p' : 
            pause = !pause;
            break;
  
    }
});

// 
function obstacleLogic(ob){
    // We can have a speed modifier for each lane
    // After incoming var reaches end reset and allow for randomizer
    // const screenBttm = gameMisc.bttmOfScreenY;

    if(ob.speedMod === 0){
        ob.speedMod = randomizer(ob.mainMod) + 1;
    }

    if(ob.y >= gameMisc.bttmOfScreenY){
        ob.y = 0;
        ob.speedMod = randomizer(ob.mainMod);

        ob.img = objArray[randomizer(objArray.length - 1)]
        //ob.img = // some random image - logic goes here
    } else {
        ob.y += ob.speedMod;
    }

    // Check if obstacle was removed
    if(!ob.appears && ob.y === 0){
        ob.appears = true;
    }
}

//Collision funtion to check the x and y cordinates of obj1(player) and obj2(obstacle) when they come in contact
function isCollision(obj1, obj2){
    if(
        obj1.rx >= obj2.lx && obj1.rx <= obj2.rx && obj1.ty >= obj2.ty && obj1.ty <= obj2.by || // topRight (car) to bottom (incoming) collision
        obj1.lx >= obj2.lx && obj1.lx <= obj2.rx && obj1.ty >= obj2.ty && obj1.ty <= obj2.by || // topLeft (car) to bottom (incoming) collision
         
        obj1.rx >= obj2.lx && obj1.rx <= obj2.rx && obj1.by <= obj2.by && obj1.by >= obj2.ty || // bottomRight (car) to top (incoming) collision
        obj1.lx >= obj2.lx && obj1.lx <= obj2.rx && obj1.by <= obj2.by && obj1.by >= obj2.ty    // bottomLeft (car) to top (incoming) collision
    ){
        if(obj2.img.alt === "woman-walking" && obj2.appears){
            scoreNode.innerText = Number(scoreNode.innerText) - 1000;
        } else if (obj2.img.alt === "man-walking" && obj2.appears) {
            scoreNode.innerText = Number(scoreNode.innerText) - 1000;
        } else if (obj2.img.alt === "two-walking" && obj2.appears) {
            scoreNode.innerText =  Number(scoreNode.innerText) - 1000;
        } else if (obj2.img.alt === "gold-dollar" && obj2.appears){
            scoreNode.innerText = Number(scoreNode.innerText) + 1000;
        }
        return true;
    } else {
        return false;
    }

}



function draw(obj){
    ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
}

function obstacleDisappear(obj){
    // I want to make the object disappear so that the program can still keep it's timing by tracking the obj to the bottom of screen
    obj.appears = false;
}

function isDisappeared(obj){
    if(!obj.img){
        return true;
    }
    return false;
}

function gameLoop(){
    if(pause === true){
        return;
    }
    if(yOffSet >= 0) {
        yOffSet = -680; //image size is -680 if(yOffSet >= 0 ) yOffset = -680, road image will continue to move virtically 
        count++;
    } 
    // drawImage() method draws an image, canvas, or video onto the canvas.It can also draw parts of an image, and/or increase/reduce the image size.
    ctx.drawImage(road, 0, yOffSet); //first print of road image
    ctx.drawImage(road, 0, yOffSet + 680); //second print of road image
    ctx.drawImage(road, 0, yOffSet + 1008);//third print of road image to make seamless

    //increment road image by 10 yOffSet += 10;
    yOffSet += player1.y-500;
 
    updateCar(player1);
    updateObstacle(leftObstacle);
    updateObstacle(rightObstacle);

    obstacleLogic(leftObstacle);
    obstacleLogic(rightObstacle);

    obstacleLogic(leftObstacle);
    obstacleLogic(rightObstacle);

    draw(player1);

    if(isCollision(player1, leftObstacle)){
        obstacleDisappear(leftObstacle);
    } else if(leftObstacle.appears){
        draw(leftObstacle);
    }

    if(isCollision(player1, rightObstacle)){
        obstacleDisappear(rightObstacle);
    } else if(rightObstacle.appears){
        draw(rightObstacle);
    }

    requestAnimationFrame(gameLoop);
}


//The window object is supported by all browsers. It represents the browser's window. All global JavaScript objects, functions, and variables automatically become members of the window object. Global variables are properties of the window object.Global functions are methods of the window object.Even the document object (of the HTML DOM) is a property of the window object:
//Window.requestAnimationFrame()
// Tells the browser that an animation is in progress, requesting that the browser schedule a repaint of the window for the next animation frame. 