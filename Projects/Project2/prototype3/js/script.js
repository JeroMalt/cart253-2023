

let img;
let img2;


function preload() {
img = loadImage('assets/images/soccerBall.png');
img2 = loadImage('assets/images/field.jpg');
}
let video;
let model;
let face;
let paddle;
let gravityForce = 0.0095;
let balls = [];
let numBalls = 1;
let bounceScore = 0; 
let highScore = 0;


function setup() {
    createCanvas(1028,720);
    img = loadImage('assets/images/soccerBall.png');

    video = createCapture(VIDEO);
    video.hide();

    loadFaceModel();

    //create the paddle
    //paddle = new Paddle(300,20);
//creates the balls
    for (let i = 0; i < numBalls; i ++){
        let x = random(0,width);
        let y = random(-400,-100);
        let ball = new Ball(x,y);
        balls.push(ball);
    }

}
async function loadFaceModel() {
    model = await blazeface.load();
}

function draw() {
   
    
    
    translate(width, 0);
    //then scale it by -1 in the x-axis
    //to flip the image
    scale(-1, 1);
    image(img2, width/2,height/2,width,height);

    if (video.loadedmetadata && model !== undefined) {
        getFace();
    }

         if (face !== undefined) {

            


          // background(255);
          imageMode(CENTER);
          image(img2, width/2,height/2);


        let bodyx = 0;
        let bodyy = 0;

        let rightEye = face.landmarks[0];
        let leftEye =  face.landmarks[1];
        let nose =     face.landmarks[2];
        let rightEar = face.landmarks[4];
        let leftEar =  face.landmarks[5];

        rightEye = scalePoint(rightEye);
        leftEye =  scalePoint(leftEye);
        nose =     scalePoint(nose);
        rightEar = scalePoint(rightEar);
        leftEar = scalePoint(leftEar);


        let faceSize = dist(rightEar.x, rightEar.y,leftEar.x,leftEar.y);
        let eyeSize = dist(rightEye.x, rightEye.y,leftEye.x,leftEye.y);
        //let noseSize = 
        let faceCenterx = (leftEar.x + rightEar.x + nose.x + rightEye.x + leftEye.x)/5;
        let faceCentery = (leftEar.y + rightEar.y + nose.y + rightEye.y + leftEye.y)/5;
        bodyx = faceCenterx;
        bodyy = faceCentery *1.2;


         //body
         push();
         fill(255,0,0);
         triangle(bodyx, bodyy, bodyx/2, bodyy*3,bodyx*1.5, bodyy*3);
         pop();
 
 
        //head
        push();
        rectMode(CENTER);
        fill(255,192,203);
        rect(faceCenterx, faceCentery ,faceSize,faceSize * 1.5, 20);
        pop();

        //eyes
        push();
        ellipseMode(CENTER);
        fill(255);
        ellipse(rightEye.x, rightEye.y,eyeSize/2,eyeSize/2 * 1.5);
        ellipse(leftEye.x, leftEye.y,eyeSize/2,eyeSize/2 * 1.5);
        pop();
        
        push();
        ellipseMode(CENTER);
        fill(0);
        ellipse(rightEye.x, rightEye.y,eyeSize/4);
        ellipse(leftEye.x, leftEye.y,eyeSize/4);
        pop();
        
        //nose
        // push();
        // rectMode(CENTER);
        // fill(150,75,100);
        // rect(nose.x, nose.y,25,40);
        // pop(); 

        //mouth
        push();
        stroke(0);
        strokeWeight(10);
        line(rightEye.x, rightEye.y*1.3, leftEye.x,leftEye.y*1.3);
        pop();
      
        //nose
        push();
        rectMode(CENTER);
        fill(150,75,100);
        //rect(nose.x, nose.y,25,40);
        rect(nose.x, nose.y,eyeSize/2.5,eyeSize*0.7);
        pop(); 
       paddle = new Paddle(faceSize, 0,faceCenterx,faceCentery-(faceSize/1.5));
        //paddle.move();
        //paddle.display();

        for (let i =0; i < balls.length; i++) {
            let ball = balls[i];
            if (ball.active){
                ball.gravity(gravityForce);
                ball.move();
                ball.bounce(paddle);
                ball.display();
                if (ball.y - ball.size/2 > height) {
                    bounceScore = bounceScore -1;

                }
                
                

                
            }
            
           
            
            if (ball.bc){
                bounceScore = bounceScore + 1;
            }
            
            
            
            
           

        }
        if (bounceScore > highScore) {
            highScore = bounceScore;
        }
        displayScore();

    
    }
}

function displayScore(){
    push();
    translate(width, 0);
    scale(-1, 1);
    fill(255);
    stroke(20);
    textSize(100);
    text(bounceScore,100,200);
    text(highScore,600,200);
    pop();

}

function scalePoint(pt) {
    let x = map(pt[0], 0, video.width, 0, width);
    let y = map(pt[1], 0, video.height, 0, height);
    return createVector(x,y);
}
async function getFace() {

    const predictions = await model.estimateFaces(
        document.querySelector('video'),
        false
    );

    if (predictions.length === 0) {
        face = undefined;
    }
    else {
        face = predictions[0];
    }
    
}

function keyTyped() {
    if (key === 'r'){
        let x = random(0,width);
        let y = random(-400,-100);
        let ball = new Ball(x,y);
        balls.push(ball);
        }
        //return false;
}

    


