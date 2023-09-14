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
    alpha : 200

}
let circle2 = {
    x : 500, //set to the right
    y : 250, 
    size : 50,
    fill : 255,
    alpha : 200
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
    bg.red = bg.red + 1;
    //circle1
    fill(circle1.fill);
    ellipse(circle1.x, circle1.y, circle1.size);
    //circle2
    fill(circle2.fill);
    ellipse(circle2.x, circle2.y, circle2.size);

}