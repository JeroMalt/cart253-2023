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
let gridSize = 24;
let ignoreTresh = 12;

let flow;
let previousPixels;
let video;

/**
 * Description of setup
*/
function setup() {
    createCanvas(640,480);
    background(0);

    video = createCapture(VIDEO);
    video.size(640,480);
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

                
                
                

                // let roundedX = round(zone.pos.x);
                // let roundedY = round(zone.pos.y);
                // let roundedMag = round(zone.mag);
                // ellipse(roundedX, roundedY, roundedMag);

                //console.log(roundedX)
                //ellipse(ballx, height/2, 50);
                // push();
                // translate(zone.pos.x, zone.pos.y);
                // rotate(zone.angle);
                // strokeWeight(2);
                // stroke(255);
                // ellipse(0,0, zone.mag);
                // line(0,0, zone.mag,0);
                // line(zone.mag,0, zone.mag-5,-5);
                // line(zone.mag,0, zone.mag-5,5);
                // pop();
                //background(0);
                ellipse()

            }
        }
        previousPixels = copyImage(video.pixels, previousPixels);
    }
                let roundedX = round(FlowCalculator.u);
                let roundedY = round(Flowcalculator.v);
                //let roundedMag = round(flowZone.mag);
                fill(255);
                ellipse(roundedX, roundedY, 50);

}