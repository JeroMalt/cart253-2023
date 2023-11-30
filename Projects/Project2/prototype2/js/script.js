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
let gridSize = 25;
let ignoreTresh = 26;

let flow;
let previousPixels;
let video;

/**
 * Description of setup
*/
function setup() {
    createCanvas(1280,720);
    background(0);

    video = createCapture(VIDEO);
    video.size(1280,720);
    video.hide();
    

    flow = new FlowCalculator(gridSize);

}


/**
 * Description of draw()
*/
function draw() {
    //image(video,0,0);
    background(0);
    video.loadPixels();
    if (video.pixels.length >0) {
        if (previousPixels){
            if(same(previousPixels, video.pixels, 4, width)){
                return;
            }
            flow.calculate(previousPixels, video.pixels, video.width, video.height);
        }
        //image(video, 0,0);

        if (flow.zones) {
            // console.log(flow.zones)
            // noLoop();

            for(let zone of flow.zones) {
                if (zone.mag < ignoreTresh) {
                    continue;
                }


                //console.log(roundedX)
                //ellipse(ballx, height/2, 50);
                push();
                translate(zone.pos.x, zone.pos.y);
                rotate(zone.angle);
                strokeWeight(2);
                stroke(255);
                ellipse(0,0, zone.mag);
                // line(0,0, zone.mag,0);
                // line(zone.mag,0, zone.mag-5,-5);
                // line(zone.mag,0, zone.mag-5,5);
                pop();
                //background(0);
               

            }
        }
        previousPixels = copyImage(video.pixels, previousPixels);
    }
                

}