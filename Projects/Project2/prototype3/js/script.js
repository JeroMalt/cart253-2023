
let video;
let model;
let face;

function setup() {
    createCanvas(1028,720);

    video = createCapture(VIDEO);
    video.hide();

    loadFaceModel();

}
async function loadFaceModel() {
    model = await blazeface.load();
}

function draw() {
    
    if (video.loadedmetadata && model !== undefined) {
        getFace();
    }

    if (face !== undefined) {

        // console.log(face);
        // noLoop();

        image(video, 0,0, width, height);
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



    }


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
    





