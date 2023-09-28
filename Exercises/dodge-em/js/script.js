/**
 * DODGING COVID19
 * Jérome Maltais
 * 
 * this is activity 4 
 */

"use strict";

/**
 * loading up of the images and sound
*/
let sound
let img
let img2
function preload() {
    img = loadImage('assets/images/bomb.png');  //bomb image
    img2 = loadImage('assets/images/boom.png');  //explosion image
    sound =  loadSound('assets/sounds/explode.mp3');
}

//variables set up 
let ballAmount = 1000;
let Elli = {
    r : 0,
    g : 0,
    b : 0, 
    size : 10
};

let bomb = { //declaring the bomb object/variable
    x: 0,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 10,
    fill: {
        r: 255,
        g: 0,
        b: 0
    }};
    //declaring the user variables
    let user = {
        x: 250,
        y: 250,
        size: 50,
        fill: 255
    };

/**
 * creation of the canvas and bomb movement
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    bomb.y = random(0, height);
    bomb.vx = bomb.speed; 

   


    
}


/**
 * Description of draw()
*/
function draw() {
    background(200);
    

//loop for the radom ball and their random colors 
    for (let i = 0; i < ballAmount; i++){
        let x = random(0, width);
        let y = random(0, height);
        Elli.r = random(0,255);
        Elli.g = random(0,255);
        Elli.b = random(0,255);
        Elli.size = random(1, 25);
        fill(Elli.r,Elli.g,Elli.b);
        ellipse(x,y,Elli.size);

     }
    //text instruction 
    textAlign(CENTER);
    textSize(20);
    text('do not explode bro. press arrow keys to escape bro.', windowHeight/2 ,windowWidth/2);



 //bomb movements
    bomb.x = bomb.x + bomb.vx;   
    bomb.y = bomb.y + bomb.vy;

    if (bomb.x > width){
        bomb.x = 0;
        bomb.y = random(0, height);

    }
   
   //variable that is the distance between the user and the bomb
    let d = dist(user.x, user.y, bomb.x, bomb.y);
  
    //THE BOMB
  imageMode(CENTER);
  image(img,bomb.x,bomb.y, 100, 100);
   //THE USER or "bro" 
    fill(user.fill);
    ellipse(user.x, user.y, user.size);

    if(user.x > width){
        user.x = 0;
    }
    if(user.x < 0){
        user.x = width;
    }
    if(user.y > height){
        user.y = 0;
    }
    if(user.y < 0){
        user.y = height;
    }

   
   
    //explosion when the user makes contact with the bomb 
    if(d < bomb.size/3 + user.size/3) {
        noLoop();
        background(0);
        imageMode(CENTER);
        image(img2,bomb.x,bomb.y);
        text('you exploded bro...',windowHeight/2, windowWidth/2);
        sound.play();
      }
}

//user movement
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      user.x = user.x - 25;
    } else if (keyCode === RIGHT_ARROW) {
      user.x = user.x + 25;
    }
    
      if (keyCode === UP_ARROW) {
        user.y = user.y - 25;
      } else if (keyCode === DOWN_ARROW) {
        user.y = user.y + 25;
      }
  }