/**
 * Space Exploration Simulator
 * Jerome Maltais 
 * 
 * A simulator where you need to explore the planet of a small solar system, multiple ending! 
 * created using exemple from the love exercise and from p5js webstie
 * https://editor.p5js.org/LindseyPiscitell/sketches/SJgoswgp spinning movement
 * https://editor.p5js.org/kjhollen/sketches/ryZBahkKx cicurlar motion 
 * 
 */

"use strict";
let sunImg
let plan1Img
let plan2Img
let plan3Img
let shipImg
let shipDownImg
let shipLeftImg
let shipRightImg
let titleImg
let secretEnding
let event1Img
let event2Img
let event3Img


function preload() {
    sunImg = loadImage('assets/images/sun.png');
    plan1Img = loadImage('assets/images/planet1.png');
    plan2Img = loadImage('assets/images/planet2.png');
    plan3Img = loadImage('assets/images/planet3.png');
    shipImg = loadImage('assets/images/ship.png');
    shipDownImg = loadImage('assets/images/shipDown.png');
    shipLeftImg = loadImage('assets/images/shipLeft.png');
    shipRightImg = loadImage('assets/images/shipRight.png');
    titleImg = loadImage('assets/images/title.png');
    secretEnding = loadImage('assets/images/secret.png');
    event1Img = loadImage('assets/images/event1.png');
    event2Img = loadImage('assets/images/event2.png');
    event3Img = loadImage('assets/images/event3.png');

}
let ship = {
    x : 100,
    y : 150,
    size : 32,
    speed : 4
}   

let sun = {
        x : 0,
        y : 0,
        size : 128,
        vx : 0,
        vy : 0, 
        speed : 0
    };
var planet1 = {
       size : 128,
       centery : 500, 
       centerx : 500,
       radius : 150,
       angle : 0,
       speed : 0.02
    };
var planet2 = {
        size : 128,
        centery : 500, 
        centerx : 500,
        radius : 250,
        angle : 0,
        speed : 0.009
     };
var planet3 = {
        size : 128,
        centerx : 500,
        centery : 500, 
        radius : 400,
        angle : 0,
        speed : 0.001
     };     

    
let state = 'title';
let plan1Explo = 0;//variable to detect if the user explored a planet
let plan2Explo = 0;
let plan2ExploAlt = 0;
let plan3Explo = 0;
var deg = 10; //value for the rotation of the sun 
// the center of rotation for the planets:
let centerX = 500;
let centerY = 500;
var plan1X = 0; //variables used for the circular motion of the planets
var plan1Y = 0;
var plan2X = 0;
var plan2Y = 0;
var plan3X = 0;
var plan3Y = 0;

function setup() {

    createCanvas(1000,1000);

}



function draw() {
    background(0);
    mainframe();
    
    

}
//function that determines in what state(scene) the users is in
function mainframe(){
    // the if statement that controls what scene are we in 
    if (state === 'title') {
        title();

    }
    else if (state === 'simulation'){
    //main screen
    exploration();
    if(plan1Explo + plan2Explo + plan3Explo === 3) {

        state = 'end';
    }

}
    else if (state === 'planet1'){
        event1();

}
    else if (state === 'planet2'){
        event2();

}
    else if (state === 'planet3'){
        event3();
}
    else if (state === 'secret'){
        //sun event 
        icarus();
    }
    else if (state === 'dead'){
    
        death();
    }
    else if (state === 'end'){
        push();
        textSize(100);
        fill(255);
        textAlign(CENTER);
        text('THE END', 500, 500);
        pop();
        push();
            textSize(25);
            fill(255);
            textAlign(CENTER);
            text('You have done it, you are a true space explorer!', 500, 600);
            pop();
    }

}
//title screen
function title() {

    imageMode(CENTER);
    image(titleImg,500,500,1000,1000);


}
//event that ocurs when your ship enters in contact with the sun
function icarus() {
    //background(0);
    imageMode(CENTER);
    image(secretEnding, 500,500,1000,1000);
    } 
//choice event for planet1    
function event1() {
    image(event1Img, 500,500,1000,1000);
    push();
    textSize(25);
    fill(255);
    stroke(0);
    strokeWeight(3);
    textAlign(LEFT);
    text('This planet is just a huge desert with no signs of life...', 100,400 );
    text('what do you do? make your choice by pressing the number on your keyboard', 100, 450);
    pop();
    push();
    textSize(19);
    fill(255);
    stroke(0);
    strokeWeight(3);
    textAlign(LEFT);
    text('1. leave...', 200, 600);
    text('2. stay a bit and endjoy the sun!', 200, 650);
    pop();
    if(key === '1') {
        state = 'simulation';
        plan1Explo = 1;

    }
    if(key === '2') {
        state = 'dead';
        plan1Explo = 1;

    }
}
//choice event for planet2
function event2() {
    image(event2Img, 500,500,1000,1000);
    push();
    textSize(25);
    fill(255);
    stroke(0);
    strokeWeight(3);
    textAlign(LEFT);
    text('This planet looks a lot like your home, you see lifeforms approching you...', 100,400 );
    text('what do you do? make your choice by pressing the number on your keyboard', 100, 450);
    pop();
    push();
    textSize(19);
    fill(255);
    stroke(0);
    strokeWeight(3);
    textAlign(LEFT);
    text('1. leave...', 200, 600);
    text('2. say to the aliens that they need to take you to their leader!', 200, 650);
    text('3. be polite, and start living their way of life.', 200, 700);
    pop();
    if(key === '1') {
        state = 'simulation';
        plan2Explo = 1;

    }
    if(key === '2') {
        state = 'dead';
        plan2Explo = 1;

    }
    if(key === '3') {
        state = 'dead';
        plan2ExploAlt = 1;

    }
    
}
//choice event for planet3
function event3() {
    image(event3Img, 500,500,1000,1000);
    push();
    textSize(25);
    fill(255);
    stroke(0);
    strokeWeight(3);
    textAlign(LEFT);
    text('This planet is really cold, icy and weirdly smells like fart...', 100,400 );
    text('what do you do? make your choice by pressing the number on your keyboard', 100, 450);
    pop();
    push();
    textSize(19);
    fill(255);
    stroke(0);
    strokeWeight(3);
    textAlign(LEFT);
    text('1. leave...', 200, 600);
    text('2. investigate the fart smell', 200, 650);
    pop();
    if(key === '1') {
        state = 'simulation';
        plan3Explo = 1;

    }
    if(key === '2') {
        state = 'dead';
        plan3Explo = 1;

    }
    
}
//Function for the multiple death results
function death() {
    background(0);
            push();
            textSize(100);
            fill(255);
            textAlign(CENTER);
            text('DEAD', 500, 500);
            pop();
            //death 1
            if(plan1Explo === 1) {
                push();
                textSize(25);
                fill(255);
                textAlign(CENTER);
                text('Your suit melted and you suffocated', 500, 600);
                pop();

            }
            //death 2
            if(plan2Explo === 1) {
                push();
                textSize(25);
                fill(255);
                textAlign(CENTER);
                text('In this context you are the alien, so they shot you...', 500, 600);
                pop();

            }
            //death 3 (nice death)
            if(plan2ExploAlt === 1) {
                push();
                textSize(20);
                fill(255);
                textAlign(CENTER);
                text('you have lived a long and nice life on this planet, turns out they were a lot nicer than human!', 500, 600);
                pop();

            }
            //death 4
            if(plan3Explo === 1) {
                push();
                textSize(25);
                fill(255);
                textAlign(CENTER);
                text('turns out it was you who farted, you die suffocating in your suit full of farts', 500, 600);
                pop();

            }
}
//function that regroups all needed for the simulation state
function exploration(){
  
  shipMovement();
  sunrotation();
  planetuno();
  checkOverlap();


}
//display ship and control ship
function shipMovement(){ 
    
    imageMode(CENTER);
    //ship commands with their respective directional sprite.
    if(keyIsDown(UP_ARROW)){ 
        ship.y = ship.y - ship.speed; 
        image(shipImg, ship.x, ship.y ,ship.size, ship.size);
        //shipSound.play(); sound was buggy so no sound
        if(ship.y < 0){
            ship.y = 1000;
        }

    }
    else if(keyIsDown(DOWN_ARROW)){ 
        ship.y = ship.y + ship.speed; 
        image(shipDownImg, ship.x, ship.y ,ship.size, ship.size);
        //shipSound.play();
        if(ship.y > 1000){
            ship.y = 0;
        }

        
    }
    else if(keyIsDown(LEFT_ARROW)){
        ship.x = ship.x - ship.speed;
        image(shipLeftImg, ship.x, ship.y ,ship.size, ship.size);
        //shipSound.play();
        if(ship.x < 0){
            ship.x = 1000;
        }
    }
    else if(keyIsDown(RIGHT_ARROW)){
        ship.x = ship.x + ship.speed;
        image(shipRightImg, ship.x, ship.y ,ship.size, ship.size);
        //shipSound.play();
        if(ship.x > 1000){
            ship.x = 0;
        }
    }
    else { //image of the ship when it does not move
        image(shipImg, ship.x, ship.y ,ship.size, ship.size);
        //shipSound.stop();
    }
    
    
}
function sunrotation(){ //display and rotation of the sun
  push(); 
  translate (width/2,height/2);
  imageMode (CENTER);
  rotate (radians (deg));
  image(sunImg, sun.x, sun.y, sun.size,sun.size);
 
  pop();
  

 deg+=0.5;//the speed of the sun's rotation

}
function planetuno(){ //function displays and makes the planets rotate around the sun
 
  
  //planet 1 rotation and display
  plan1X = planet1.centerx + planet1.radius * cos(planet1.angle);
  plan1Y = planet1.centery + planet1.radius * sin(planet1.angle);
  image(plan1Img, plan1X, plan1Y, planet1.size,planet1.size);
  planet1.angle = planet1.angle + planet1.speed;
  //planet2 rotation and display
  plan2X = planet2.centerx + planet2.radius * cos(planet2.angle);
  plan2Y = planet2.centery + planet2.radius * sin(planet2.angle);
  image(plan2Img, plan2X, plan2Y, planet2.size,planet2.size);
  planet2.angle = planet2.angle + planet2.speed;
  //planet3 rotation and display
  plan3X = planet3.centerx + planet3.radius * cos(planet3.angle);
  plan3Y = planet3.centery + planet3.radius * sin(planet3.angle);
  image(plan3Img, plan3X, plan3Y, planet3.size,planet3.size);
  planet3.angle = planet3.angle + planet3.speed;

}
//checks if the ship enters in contact with a planet or the sun.
function checkOverlap() {
    
    
    //calculates thesun/ship distance
    let d = dist(ship.x,ship.y,500,500);
    if (d < ship.size/2 + sun.size/4){
        state = 'secret';
    }
    //calculates theplanet1/ship distance
    let d1 = dist(ship.x,ship.y,plan1X,plan1Y);
    if (d1 < ship.size/3 + planet1.size/3){
        state = 'planet1';
    }
    //calculates theplanet2/ship distance
    let d2 = dist(ship.x,ship.y,plan2X,plan2Y);
    if (d2 < ship.size/2 + planet2.size/2){
        state = 'planet2';
    }
    //calculates theplanet3/ship distance
    let d3 = dist(ship.x,ship.y,plan3X,plan3Y);
    if (d3 < ship.size/2 + planet3.size/2){
        state = 'planet3';
    }

}
//function to up out of the title screen
function keyPressed(){
    if (state === 'title'){
        state = 'simulation';
        //starts the simulation
    }
}