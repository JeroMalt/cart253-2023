/**
 * Age of aquarium EX
 * jerome
 * 
 * 
 */

"use strict";


function preload() {

}

let circle = {
    x: 0,
    y: 0,
    size: 50,
    trail: [], // Note that we are creating an EMPTY TRAIL ARRAY as a PROPERTY of the circle
    wormSize : 15
  }
let state = 'title'; 
let school = [];
let schoolSize = 10;
let appleEaten = 0;


function setup() {
    frameRate(30);
    createCanvas(600,600);

    for(let i = 0; i < schoolSize; i ++) {
        let fish = createFish(random(0, width), random(0, height)); 
        school.push(fish);
    }

}

function createFish(x, y) {
    let fish = {
        x: x,
        y: y,
        size: 50,
        vx: 0,
        vy: 0,
        speed: 6
    };
    return fish;
}

function draw() {
    background(0);
    mainFrame();
    timer();
   
    
}

function mainFrame(){
    if (state === 'title') {
        title();

    }
    else if (state === 'simulation'){
        simulation();
    }
    else if (state === 'end1'){
        end1();
    }
    else if (state === 'end2'){
        end2();
    }
}
function simulation(){
    for(let i = 0; i < school.length; i ++) {
        moveFish(school[i]);
        displayFish(school[i]);
        checkDistance(school[i]);
      }
      timeDisplay();
      worm();
      if (appleEaten === 5){
        state = 'end2';
      }
      
     
      }

function title(){
    background(0);
    push();
    textSize(50);
    textAlign(CENTER);
    fill(255);
    text('EATER WORM', width/2, height/3);
    pop();
    push();
    textSize(15);
    textAlign(CENTER);
    fill(255);
    text('you have 30 sec to eat all the apples', width/2, height/2);
    pop();

}
function end1(){
    push();
    textSize(50);
    textAlign(CENTER);
    fill(255);
    text('LOSER!', width/2, height/2);
    pop();
    

}
function end2(){
    push();
    textSize(20);
    textAlign(CENTER);
    fill(255);
    text('you are a winner!', width/2, height/3);
    pop();
    push();
    textSize(50);
    textAlign(CENTER);
    fill(255);
    text('Plus your belly is full.', width/2, height/2);
    pop();

}


function worm(){
    for (let i = 0; i < circle.trail.length; i++) {
        // Get the element at the index indicated by i (0, then 1, then 2, etc.)
        let element = circle.trail[i];
        // Draw an ellipse the same size as the circle at that position
        noStroke();
        fill(255,192,203);
        ellipse(element.x, element.y, circle.size);
      }
    
      // Move the circle to the mouse position
      circle.x = mouseX;
      circle.y = mouseY;
    
      // Draw the circle
      ellipse(circle.x, circle.y, circle.size);
    
      // Create a new position object that stores where the circle is now
      // which we can add to the trail to trace the path of the circle
      let newTrailPosition = {
        x: circle.x,
        y: circle.y
      };
      // Add the position to the circle's trail array
      circle.trail.push(newTrailPosition);
      if(circle.trail.length > circle.wormSize) {
        circle.trail.shift();
      }
    }

function timer(){
    if (frameCount >= 900) {
        state = 'end1';

    }
}
function timeDisplay(){
    let countDownRaw = map(frameCount,0 , 900, 30, 0);
    let countDownCooked = round(countDownRaw, 1);
    push();
    textSize(30);
    textAlign(CENTER);
    fill(255);
    text(countDownCooked, width/2, height/6);
    pop();
}
function moveFish(fish){
    let change = random(0,1);
    if(change < 0.05) {
        fish.vx = random(-fish.speed, fish.speed);
        fish.vy = random(-fish.speed, fish.speed);
    }

    fish.x = fish.x + fish.vx;
    fish.y = fish.y + fish.vy;

    fish.x = constrain(fish.x, 0, width);
    fish.y = constrain(fish.y, 0, height);

}

function displayFish(fish) {
    push();
    fill(255,0,0);
    noStroke();
    ellipse(fish.x, fish.y, fish.size);
    pop();
}
function checkDistance(fish){
    let d = dist(mouseX, mouseY, fish.x, fish.y);
  if (d < fish.size / 2 + circle.size / 2) {
    text('fuck', width / 2, height /2);
    school.pop(); 
   
     
  }
}

function mousePressed() {
    let fish = createFish(mouseX, mouseY);
    school.push(fish);
}
function keyPressed(){
    if (state === 'title'){
        state = 'simulation';
        //starts the simulation
    }
    
}
