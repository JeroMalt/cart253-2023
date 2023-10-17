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


function preload() {


}
   

let sun = {
        x : 0,
        y : 0,
        size : 100,
        vx : 0,
        vy : 0, 
        speed : 0
    };
let planet1 = {
       radius : 150,
       angle : 5,
       speed : 0.05
    };
let planet2 = {
        radius : 250,
        angle : 2,
        speed : 0.02
     };
let planet3 = {
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
  ellipse(mouseX,mouseY,50,50)

  push();
  translate (width/2,height/2);
  rectMode (CENTER);
  fill(255,165,50);
  rotate (radians (deg));
  rect(sun.x,sun.y,70,70);
  pop();
  

 deg+=2;

 planetuno();
 checkOverlap();


}
function planetuno(){ //function take makes the planets rotate around the sun
  push();
  translate(centerX, centerY);
  rotate (planet1.angle);
  rect(planet1.radius, 0, 50, 50);
  pop();

  push();
  translate(centerX, centerY);
  rotate (planet2.angle);
  rect(planet2.radius, 0, 50, 50);
  pop(); 

  push();
  translate(centerX, centerY);
  rotate (planet3.angle);
  rect(planet3.radius, 0, 50, 50);
  pop(); 

  planet1.angle = planet1.angle + planet1.speed;
  planet2.angle = planet2.angle + planet2.speed;
  planet3.angle = planet3.angle + planet3.speed;
}

function checkOverlap() {
    //check if the flshdrive and the port overlap (connect)
    let d = dist(mouseX,mouseY,sun.x,sun.y);
    if (d < circle1.size/3 + circle2.size/3){
        state = 'love';
    }

}

function mousePressed(){
    if (state === 'title'){
        state = 'simulation';
        //starts the simulation
    }
}