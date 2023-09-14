/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
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
 * Description of setup
*/
function setup() {
    createCanvas(500,500);
    noStroke();

}


/**
 * Description of draw()
*/
function draw() {
    background(bg.red, bg.green, bg.blue);
    bg.red = bg.red + 1;

}