/**
 * Love Actually EX
 * Jerome Maltais 
 * 
 * this is the code for the love actually exercise
 */

"use strict";

//declaring the image 
let img
let img2
function preload() {
    //loading image
    img = loadImage('assets/images/flash.png');  //bomb image
    img2 = loadImage('assets/images/port.png');  //explosion image

}
//old data from the activity, some are still used some are not...
let circle1 = {
    x : 0,
    y : 0,
    size : 100,
    vx : 0,
    vy : 0, 
    speed : 3
};
let circle2 = {
    x : undefined,
    y : 250,
    size : 50,
    vx : 0,
    vy : 0, 
    speed : 3
};
let state = 'title'; 

function setup() {
    createCanvas(500,500);
    setupCircles();
    
}

function setupCircles() {
    
    //position circle separated form eachother, in this case just a starting point for the usb port image 
    //circle1.x = width / 3;
    circle2.x = 2 * width / 3;
    
    //start circle moving in random direction, same here this only apply to the usb port image
    //circle1.vx = random(-circle1.speed, circle1.speed);
    circle2.vx = random(-circle2.speed, circle2.speed);
    //circle1.vy = random(-circle1.speed, circle1.speed);
    circle2.vy = random(-circle2.speed, circle2.speed);

}

function draw() {
    background(0);
    
// the if statement that controls what scene are we in 
    if (state === 'title') {
        title();

    }
    else if (state === 'simulation'){
    simulation();

}
    else if (state === 'love'){
        love();

}
    else if (state === 'sad'){
        sadness();

}
    else if (state === 'drop'){
        dropedIt();
    }

}
//title scene 
function title() {
    push();
    textSize(40);
    fill(200,100,100);
    textAlign(CENTER,CENTER);
    text('connect your flash drive', width/2, height/2);
    pop();
}
//main scene aka where the connecting happen
function simulation() {
   move();
   checkOffscreen();
   checkOverlap();
   display();
}
//end scene1 when the connection is made
function love(){
    push();
    textSize(35);
    fill(200,0,0);
    textAlign(CENTER,CENTER);
    text(' your flash drive is connected', width/2, height/2);
    pop();
    
}
//end scene2 where the connection is not made
function sadness(){
    push();
    textSize(40);
    fill(70,70,225);
    textAlign(CENTER,CENTER);
    text('no data found...', width/2, height/2);
    pop();
    
}
//end scene 3 - easter egg - when you clic the mouse during the simulation state 
function dropedIt(){
    push();
    textSize(40);
    fill(255,200,0);
    textAlign(CENTER,CENTER);
    text('oh you droped it', width/2, height/2);
    pop();
    
}

function move() {
     // move the circle
     //circle1.x = circle1.x + circle1.vx; 
     //circle1.y = circle1.y + circle1.vy;
 //moves the usb port image 
     circle2.x = circle2.x + circle2.vx; 
     circle2.y = circle2.y + circle2.vy;
}

function checkOffscreen() {
    //check if the usb port has gone off screen 

    if (circle1.x < 0 || circle1.x > width || circle1.y < 0 || circle1.y > height || circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {
        state = 'sad';
    }


}

function checkOverlap() {
    //check if the flshdrive and the port overlap (connect)
    let d = dist(mouseX,mouseY,circle2.x,circle2.y);
    if (d < circle1.size/3 + circle2.size/3){
        state = 'love';
    }

}

function display() { 
    //display the images
    imageMode(CENTER,CENTER);
    image(img, mouseX, mouseY, circle1.size,circle1.size);
    image(img2, circle2.x, circle2.y, circle2.size,circle2.size);
    //ellipse(circle2.x, circle2.y, circle2.size);
}
function mousePressed(){
    if (state === 'title'){
        state = 'simulation';
        //starts the simulation
    }
    else if(state ==='simulation'){
        state = 'drop';
        //drop the flash drive
    }
}
