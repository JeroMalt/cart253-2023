/**
 * Alien activity
 * jerome
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


/**
 * Description of setup
*/
function setup() {
    createCanvas(640,480);
    
    background(160,40,75);
    noStroke();

    fill(0,150,0);  //body
    ellipse(320, 480, 300, 200);

    fill(10,200,10);  //head
    ellipse(320, 240, 250, 360);
    fill(10,200,10);
    ellipse(320, 200, 300, 360);

    fill(0,0,0);   //eyes 
    ellipse(260, 180, 60, 150);
    ellipse(380, 180, 60, 150);

    ellipse(310, 280, 10, 10);   // nostrils
    ellipse(330, 280, 10, 10);

    stroke(200, 0, 0);
    strokeWeight(10);
    rectMode(CENTER);
    rect(320, 340, 100, 20);
    

}


/**
 * Description of draw()
*/
function draw() {

}