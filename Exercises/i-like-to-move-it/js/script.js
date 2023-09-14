/**
 * i like to move it
 * jerome maltais
 * 
 * 
 * this is the exercise 1, a composition of moving shapes
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}
let bg = { 
    r : 0,
    g : 0,
    b : 0
}
let mouseC1 = mouseX;



/**
 * Description of setup
*/
function setup() {
    createCanvas(900,900);
    

}


/**
 * Description of draw()
*/
function draw() {
    background(bg.r, bg.g, bg.b);
    //mapping the background color with mouse movement
    bg.r + map(mouseC1, 0, 900, 0, 255);

}