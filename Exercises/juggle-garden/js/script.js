/**
 * juggling balls 
 * jerome Maltais
 * 
 * 
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
//create the paddle
    paddle = new Paddle(300,20);
//creates the balls
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
//function to switch between states 
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
//main state of simulation 
function simulation(){
    paddle.move();
    paddle.display();
    timer();
    timeDisplay();
   
//for loop that process only the active balls
    for (let i =0; i < balls.length; i++) {
        let ball = balls[i];
        if (ball.active){
            ball.gravity(gravityForce);
            ball.move();
            ball.bounce(paddle);
            ball.display();

        }
        
    }
    //
    for (let i =0; i < greenBalls.length; i++) {
        let greenBall = greenBalls[i];
        if (greenBall.active){
            greenBall.gravity(gravityForce);
            greenBall.move();
            greenBall.bounce(paddle);
            greenBall.display();

        }
        
    }
    //if the user have pull out 5 of each color balls at the same time they win
    if (balls.length === 5 && greenBalls.length === 5) {
        state = 'end1';
    }

}




//tittle screen
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
//funstion that displays the winner ending 
function end1(){
    push();
    textSize(50);
    textAlign(CENTER);
    fill(255);
    text('Well done!', width/2, height/2);
    pop();
    

}
//function that displays the loser ending 
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
//function that caculates the time left using frame count
//it is not the best way to do it because the frame count starts at the very start
function timer(){
    if (frameCount >= 1800) {
        state = 'end2';

    }
}
//function that display the time left
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
//function to add new balls
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


//function to skip the tittle page
function keyPressed(){
    if (state === 'title'){
        state = 'simulation';
        //starts the simulation
    }
    
    
}