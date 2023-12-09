//HEADER SIMULATOR 
//by jerome Maltais 
//fall 2023
//concordia University 
//Montreal

//made with the jungle-garden exercise 
//also using the blazeFace model with help form this tutorial https://www.youtube.com/watch?v=jovusqHNpRo&t=25s 


// Declare global variables for images
let img;
let img2;
let img3;
let img4;
let img5;

// Preload function to load images before setup
function preload() {
  img = loadImage('assets/images/soccerBall.png');
  img2 = loadImage('assets/images/field.jpg');
  img3 = loadImage('assets/images/title.png');
  img4 = loadImage('assets/images/fail.png');
  img5 = loadImage('assets/images/win.png');
}

// Declare global variables for video, face model, paddle, and other parameters
let video;
let model;
let face;
let paddle;
let gravityForce = 0.0095;
let balls = [];
let numBalls = 1;
let bounceScore = 0;
let highScore = 0;
let state = 'title';
let synth
let difficulty = 1;

// Setup function to initialize canvas, video, and objects
function setup() {
  createCanvas(1028, 720);

  // Capture video from the webcam
  video = createCapture(VIDEO);
  video.hide();

  // Initialize a Monophonic Synthesizer
  synth = new p5.MonoSynth();

  // Load the BlazeFace model for face detection
  loadFaceModel();

  // Create the initial set of balls
  for (let i = 0; i < numBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let ball = new Ball(x, y);
    balls.push(ball);
  }
}

// Asynchronous function to load the BlazeFace model
async function loadFaceModel() {
  model = await blazeface.load();
}

// Main draw function, calls different states of the game
function draw() {
  mainFrame();
}

// Function to manage different states of the game
function mainFrame() {
  if (state === 'title') {
    title();
  } else if (state === 'header') {
    header();
  } else if (state === 'fail') {
    fail();
  } else if (state === 'win') {
    win();
  }
}

// Display the title screen
function title() {
  imageMode(CENTER);
  image(img3, width / 2, height / 2, width, height);
}
function header() {
    // Translate to the right edge of the canvas and flip it horizontally
    translate(width, 0);
    scale(-1, 1);

    // Check if video metadata is loaded and the face model is defined
    if (video.loadedmetadata && model !== undefined) {
        // Get the face data from the webcam
        getFace();
    }

    // Check if a face is detected
    if (face !== undefined) {
        // Display the background image
        imageMode(CENTER);
        image(img2, width / 2, height / 2);

        // Initialize variables for facial features and dimensions
        let bodyx = 0;
        let bodyy = 0;

        let rightEye = face.landmarks[0];
        let leftEye = face.landmarks[1];
        let nose = face.landmarks[2];
        let rightEar = face.landmarks[4];
        let leftEar = face.landmarks[5];

        // Scale facial features to match canvas dimensions
        rightEye = scalePoint(rightEye);
        leftEye = scalePoint(leftEye);
        nose = scalePoint(nose);
        rightEar = scalePoint(rightEar);
        leftEar = scalePoint(leftEar);

        // Calculate face and eye dimensions, and the position of facial features
        let faceSize = dist(rightEar.x, rightEar.y, leftEar.x, leftEar.y);
        let eyeSize = dist(rightEye.x, rightEye.y, leftEye.x, leftEye.y);
        let faceCenterx = (leftEar.x + rightEar.x + nose.x + rightEye.x + leftEye.x) / 5;
        let faceCentery = (leftEar.y + rightEar.y + nose.y + rightEye.y + leftEye.y) / 5;
        bodyx = faceCenterx;
        bodyy = faceCentery * 1.2;

        // Draw the body as a triangle
        push();
        fill(255, 0, 0);
        triangle(bodyx, bodyy, bodyx / 2, bodyy * 3, bodyx * 1.5, bodyy * 3);
        pop();

        // Draw the head as a rectangle
        push();
        rectMode(CENTER);
        fill(255, 192, 203);
        rect(faceCenterx, faceCentery, faceSize, faceSize * 1.5, 20);
        pop();

        // Draw the eyes
        push();
        ellipseMode(CENTER);
        fill(255);
        ellipse(rightEye.x, rightEye.y, eyeSize / 2, eyeSize / 2 * 1.5);
        ellipse(leftEye.x, leftEye.y, eyeSize / 2, eyeSize / 2 * 1.5);
        pop();

        // Draw the pupils
        push();
        ellipseMode(CENTER);
        fill(0);
        ellipse(rightEye.x, rightEye.y, eyeSize / 4);
        ellipse(leftEye.x, leftEye.y, eyeSize / 4);
        pop();

        // Draw the nose
        push();
        rectMode(CENTER);
        fill(150, 75, 100);
        rect(nose.x, nose.y, eyeSize / 2.5, eyeSize * 0.7);
        pop();

        // Draw the mouth as a line
        push();
        stroke(0);
        strokeWeight(10);
        line(rightEye.x, rightEye.y * 1.3, leftEye.x, leftEye.y * 1.3);
        pop();

        // Create the paddle based on face dimensions
        paddle = new Paddle(faceSize, 0, faceCenterx, faceCentery - (faceSize / 1.5));

        // Iterate through each ball and update its position, check for collisions, and display
        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i];
            if (ball.active) {
                ball.gravity(gravityForce);
                ball.move();
                ball.bounce(paddle);
                ball.display();
                if (ball.y - ball.size / 2 > height) {
                    bounceScore = bounceScore - 1;
                }
            }
            if (ball.bc) {
                bounceScore = bounceScore + difficulty;
                playSynth();
            }
        }

        // Update and display scores, check for game over or win conditions
        if (bounceScore > highScore) {
            highScore = bounceScore;
        }
        displayScore();

        if (bounceScore <= -15) {
            state = 'fail';
        }

        if (bounceScore >= 50) {
            state = 'win';
        }
    }
}


// Display the fail screen with the current high score
function fail() {
    // Set image mode to center and display the fail image
    imageMode(CENTER);
    image(img4, width / 2, height / 2, width, height);

    // Display the high score with text settings
    textAlign(CENTER);
    fill(255);
    stroke(20);
    textSize(100);
    text(highScore, (width / 2) + 300, 200);
}

// Display the win screen
function win() {
    // Set image mode to center and display the win image
    imageMode(CENTER);
    image(img5, width / 2, height / 2, width, height);
}

// Display the current and high scores
function displayScore() {
    // Flip the score display horizontally
    push();
    translate(width, 0);
    scale(-1, 1);

    // Set text settings and display current and high scores
    textAlign(CENTER);
    fill(255);
    stroke(20);
    textSize(100);
    text(bounceScore, (width / 2) - 300, 200);
    text(highScore, (width / 2) + 300, 200);
    pop();
}

// Scale a point from video coordinates to canvas coordinates
function scalePoint(pt) {
    let x = map(pt[0], 0, video.width, 0, width);
    let y = map(pt[1], 0, video.height, 0, height);
    return createVector(x, y);
}

// Asynchronous function to get the face from the webcam using BlazeFace
async function getFace() {
    const predictions = await model.estimateFaces(document.querySelector('video'), false);

    if (predictions.length === 0) {
        face = undefined;
    } else {
        face = predictions[0];
    }
}

// Handle typed keys, create a new ball on 'r'
function keyTyped() {
    if (key === 'r') {
        // Create a new ball at a random position
        let x = random(10, width - 10);
        let y = random(-400, -100);
        let ball = new Ball(x, y);
        balls.push(ball);
    }
}

// Handle key press, change state from title to header
function keyPressed() {
    if (state === 'title') {
        state = 'header';
        // Start the simulation
    }
}

// Play a synthesizer note when a ball bounces
function playSynth() {
    userStartAudio();

    // Choose a random note for the synthesizer
    let note = random(['Fb2', 'G2']);
    // Note velocity (volume, from 0 to 1)
    let velocity = random();
    // Time from now (in seconds)
    let time = 0;
    // Note duration (in seconds)
    let dur = 1 / 6;

    // Play the synthesizer note
    synth.play(note, velocity, time, dur);
}

    


