/**
 * DODGING COVID19
 * Jérome Maltais
 * 
 * this is activity 4 
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}

let covid19 = { //declaring the covid19 object/variable
    x: 0,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 500,
    fill: {
        r: 255,
        g: 0,
        b: 0
    }
};
/**
 * Description of setup
*/
function setup() {
    createCanva(windowWidth, windowHeight);
    covid19.y = random(0, height);
    covid19.vx = covid19.speed; 

}


/**
 * Description of draw()
*/
function draw() {
    background(0);
    
    covid19.x = covid19.x + covid19.vx;
    covid19.y = covid19.y + covid19.vy;

    fill(covid19.fill.r, covid19.fill.g, covid19.fill.g);
 
    circle(covid19.x, covid19.y, covid19.size);
    
}