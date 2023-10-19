/**
 * Space Exploration Simulator
 * Jerome Maltais 
 * 
 * A simulator where you need to explore the planet of a small solar system 
 * created using exemple from the love exercise and from p5js webstie
 * https://editor.p5js.org/LindseyPiscitell/sketches/SJgoswgp spinning movement
 * https://editor.p5js.org/kjhollen/sketches/ryDpkpvjQ cicurlar motion 
 * 
 */

"use strict";
let sunImg
let plan1Img
let plan2Img
let plan3Img
let shipImg

function preload() {
    sunImg = loadImage('assets/images/sun.png');
    plan1Img = loadImage('assets/images/planet1.png');
    plan2Img = loadImage('assets/images/planet2.png');
    plan3Img = loadImage('assets/images/planet3.png');
    shipImg = loadImage('assets/images/ship.png');
}
let ship = {
    x : 0,
    y : 0,
    size : 32
}   

let sun = {
        x : 0,
        y : 0,
        size : 128,
        vx : 0,
        vy : 0, 
        speed : 0
    };
let planet1 = {
       size : 128,
       y : 0, 
       radius : 150,
       angle : 5,
       speed : 0.05
    };
let planet2 = {
        size : 128,
        y : 0, 
        radius : 250,
        angle : 2,
        speed : 0.02
     };
let planet3 = {
        size : 128,
        y : 0, 
        radius : 400,
        angle : 7,
        speed : 0.009
     };     

    
let state = 'title';
var deg = 10; //value for the rotation of the sun 

// the center of rotation for the planets:
let centerX = 500;
let centerY = 500;






function setup() {

    createCanvas(1000,1000);

}



function draw() {
    background(0);
    
    // the if statement that controls what scene are we in 
        if (state === 'title') {
            title();
    
        }
        else if (state === 'simulation'){
        //main screen
        exploration();
    
    }
        else if (state === 'planet1'){
            //event1
    
    }
        else if (state === 'planet2'){
            //event2
    
    }
        else if (state === 'planet3'){
            //event3
    }
        else if (state === 'sun'){
            //sun event 
        }

}

function title() {
    push();
    textSize(40);
    fill(255);
    textAlign(CENTER,CENTER);
    text('clic mouse to start exploring', width/2, 750);
    pop();
    push();
    textSize(75);
    fill(255);
    textAlign(CENTER,CENTER);
    text('SPACE EXPLORER', width/2, 400);
    pop();

}
function exploration(){
  image(shipImg, mouseX,mouseY,32,32);
    
  //ellipse(mouseX,mouseY,50,50)

  sunrotation();
  planetuno();
 //checkOverlap();


}
function sunrotation(){ //display and rotation of the sun
  push(); 
  translate (width/2,height/2);
  imageMode (CENTER);
  fill(255,165,50);
  rotate (radians (deg));
  image(sunImg, sun.x, sun.y, sun.size,sun.size);
 // ellipse(sun.x,sun.y,sun.size);
  pop();
  

 deg+=0.5;//the speed of the sun's rotation

}
function planetuno(){ //function displays and makes the planets rotate around the sun
  push();
  translate(centerX, centerY);
  rotate (planet1.angle);
  image(plan1Img, planet1.radius, planet1.y, planet1.size,planet1.size);
  //rect(planet1.radius, 0, 50, 50);
  pop();

  push();
  translate(centerX, centerY);
  rotate (planet2.angle);
  image(plan2Img, planet2.radius, planet2.y, planet2.size,planet2.size);
  //rect(planet2.radius, 0, 50, 50);
  pop(); 

  push();
  translate(centerX, centerY);
  rotate (planet3.angle);
  image(plan3Img, planet3.radius, planet3.y, planet3.size,planet3.size);
  //rect(planet3.radius, 0, 50, 50);
  pop(); 

  planet1.angle = planet1.angle + planet1.speed;
  planet2.angle = planet2.angle + planet2.speed;
  planet3.angle = planet3.angle + planet3.speed;
}

// function checkOverlap() {
//     //check if the flshdrive and the port overlap (connect)
//     let d = dist(mouseX,mouseY,sun.x,sun.y);
//     if (d < circle1.size/3 + circle2.size/3){
//         state = 'love';
//     }

// }

function mousePressed(){
    if (state === 'title'){
        state = 'simulation';
        //starts the simulation
    }
}