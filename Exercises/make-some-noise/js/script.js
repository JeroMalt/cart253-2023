/**
 * sound Activty
 * Jerome Maltais
 * 
 * 

"use strict";

/**
 * Description of preload
*/
function preload() {

}
let balls = [];
let balls2 = [];

//f-minor

let notes = [`F3`,`G3`,`Ab4`,`Bb4`,`C4`,`Db4`,`Eb4`,`F4`];
let notes2 = [`A6`,`F6`,`Gb6`,`Bb6`,`D6`,`Eb6`,`Fb6`,`A6`];
/**
 * Description of setup
*/ 
function setup() {
    createCanvas(600,600);

    userStartAudio();

}


/**
 * Description of draw()
*/
function draw() {
    background(0);
    
    for (let i = 0; i < balls.length; i ++) {
        let ball = balls[i];
        ball.move();
        ball.bounce();
        ball.display();
    }
    for (let i = 0; i < balls2.length; i ++) {
        let ball2 = balls2[i];
        ball2.move();
        ball2.bounce();
        ball2.display();
    }

}
function mousePressed(){
    createBall(mouseX,mouseY,);
}

function createBall(x,y) {
    let note = random(notes);
    let note2 = random(notes2);
    if (mouseX <= width/2){
        let ball = new Ball(x,y,note);
        balls.push(ball);
    }
    else if (mouseX >= width/2){
        let ball2 = new Ball2(x,y,note2);
        balls2.push(ball2);   
    }
    

}
