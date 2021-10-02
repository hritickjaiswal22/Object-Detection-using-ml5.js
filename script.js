let canvas;
let video;
let detector;
let detections = [];

function preload() {
  //* Called directly before setup(), the preload() function is used to handle asynchronous
  //! loading of external files in a blocking way.
  detector = ml5.objectDetector("cocossd");
}

function setup() {
  canvas = createCanvas(800, 600);
  canvas.parent("myContainer");
  video = createCapture(VIDEO, videoLoaded);
}

function videoLoaded() {
  video.size(800, 600);
  video.hide();
  detector.detect(video, gotDetection);
}

function gotDetection(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetection);
}

function draw() {
  image(video, 0, 0, 800, 600);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    console.log(object);
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(0);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}
