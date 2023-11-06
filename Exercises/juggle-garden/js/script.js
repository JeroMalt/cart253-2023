/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";


function preload() {

}

let state = 'title'; 
let paddle;
let gravityForce = 0.0095;
let balls = [];
let greenBalls = [];
let numBalls = 1;

function setup() {
    createCanvas(windowWidth,windowHeight);
    frameRate(30);

    paddle = new Paddle(300,20);

    for (let i = 0; i < numBalls; i ++){
        let x = random(0,width);
        let y = random(-400,-100);
        let ball = new Ball(x,y);
        balls.push(ball);
    }
    for (let i = 0; i < numBalls; i ++){
        let x = random(0,width);
        let y = random(-400,-100);
        let ball = new Greenball(x,y);
        greenBalls.push(ball);
    }
    

    

}



function draw() {
    background(0);
    mainFrame();

   

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
    paddle.move();
    paddle.display();
    timer();
    timeDisplay();
   

    for (let i =0; i < balls.length; i++) {
        let ball = balls[i];
        if (ball.active){
            ball.gravity(gravityForce);
            ball.move();
            ball.bounce(paddle);
            ball.display();

        }
        
    }
    for (let i =0; i < greenBalls.length; i++) {
        let greenBall = greenBalls[i];
        if (greenBall.active){
            greenBall.gravity(gravityForce);
            greenBall.move();
            greenBall.bounce(paddle);
            greenBall.display();

        }
        
    }
    if (balls.length === 5 && greenBalls.length === 5) {
        state = 'end1';
    }

}





function title(){
    background(0);
    push();
    textSize(50);
    textAlign(CENTER);
    fill(255);
    text('bing bong', width/2, height/3);
    pop();
    push();
    textSize(15);
    textAlign(CENTER);
    fill(255);
    text('you have 1 minute to juggle with 5 green and 5 red balls, press the G and R key to make them appear! press any key to start', width/2, height/2);
    pop();

}
function end1(){
    push();
    textSize(50);
    textAlign(CENTER);
    fill(255);
    text('Well done!', width/2, height/2);
    pop();
    

}
function end2(){
    push();
    textSize(20);
    textAlign(CENTER);
    fill(255);
    text('you are a loser!', width/2, height/3);
    pop();
    push();
    textSize(50);
    textAlign(CENTER);
    fill(255);
    text('no more time to juggle! ', width/2, height/2);
    pop();

} 

function timer(){
    if (frameCount >= 1800) {
        state = 'end2';

    }
}

function timeDisplay(){
    let countDownRaw = map(frameCount,0 , 1800, 60, 0);
    let countDownCooked = round(countDownRaw, 1);
    push();
    textSize(30);
    textAlign(CENTER);
    fill(255);
    text(countDownCooked, width/2, height/6);
    pop(); 
}

    function keyTyped() {
    if (state === 'simulation'){
        if (key === 'r'){
        let x = random(0,width);
        let y = random(-400,-100);
        let ball = new Ball(x,y);
        balls.push(ball);
        }
        else if (key === 'g'){
            let x = random(0,width);
            let y = random(-400,-100);
            let gball = new Greenball(x,y);
            greenBalls.push(gball);
    
            }
            return false;
    }
}



function keyPressed(){
    if (state === 'title'){
        state = 'simulation';
        //starts the simulation
    }
    
    
}