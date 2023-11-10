/**
 * prototype of interactive mirror 
 * jerome maltais 
 * 
 * created using the motion Example on the p5js
 * https://p5js.org/examples/dom-video-pixels.html 
 * https://p5js.org/examples/dom-video-pixels.html 
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


let capture
function setup() {
  createCanvas(1920, 1080);
  capture = createCapture(VIDEO);
  capture.size(1920, 1080);
  capture.hide();
  noStroke();
  fill(0);
}


/**
 * Description of draw()
*/
function draw() {
    background(255);
  capture.loadPixels();
  const stepSize = round(constrain(mouseX/64, 6, 600));
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - capture.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      const radius2 = stepSize / darkness;
      let c1 = random(0,255)
      let c2 = random(0,100)
      let c3 = random(0,50)
      fill(c1,c2,c3);
      ellipse(x, y, radius, radius2);
    }
  }

}