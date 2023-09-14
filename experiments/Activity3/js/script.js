/**
 * moving picture activty 3
 * jerome
 * 
 * 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}

let bg = {
    red : 0,
    green : 0,
    blue : 0
}

let circle1 = {
    x : 0,
    y : 250, 
    size : 100,
    fill : 255,
    alpha : 200,
    speed : 1,
    growth : 0.25

}
let circle2 = {
    x : 500, //set to the right
    y : 250, 
    size : 50,
    fill : 200,
    alpha : 100,
    speed : -1
}



/**
 * setting the canvas
*/
function setup() {
    createCanvas(500,500);
    noStroke();

}


/**
 * 
*/
function draw() {
    //evolving red background
    background(bg.red, bg.green, bg.blue);
    bg.red = map(circle1.size,0, 500, 0, 255);
    bg.green = map(mouseX, 0, 500, 0, 255);
    bg.blue = map(mouseY, 0, 500, 0, 255);
    
    //circle1
    fill(circle1.fill,[circle1.alpha]);
    circle1.x = circle1.x + circle1.speed;//circle1 movement
    circle1.x = constrain(circle1.x, 0,width / 2);

    circle1.size = circle1.size + circle1.growth;
    circle1.size = constrain(circle1.size, 0 , width );
    ellipse(circle1.x, circle1.y, circle1.size);

    
    //circle2
    fill(circle2.fill,[circle2.alpha]);
    circle2.x = circle2.x + circle2.speed; //circle2 movement
    circle2.x = constrain(circle2.x,width / 2, 500);

    circle2.size = circle1.size * 0.9;
    ellipse(circle2.x, circle2.y, circle2.size);

}