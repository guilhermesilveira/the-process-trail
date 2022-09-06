// Capturer 1.2

var fps = 30;
var capturer = new CCapture({
  format: 'png',
  framerate: fps
});

var startMillis;
let forceEndCapturing = false;


function captureStart() {
  	frameRate(fps);
	capturer.start();
}

function  frameCaptureStart() {
  if (startMillis == null) {
    startMillis = millis();
  }
	
}

function elapsedTime() {
  if(CAPTURE_DURATION == null) return false;
  const elapsed = millis() - startMillis;
  const t = map(elapsed, 0, CAPTURE_DURATION, 0, 1);
  return t > 1;
}

function frameCaptureEnd() {
  capturer.capture(document.getElementById('defaultCanvas0'));
  
  if (elapsedTime() || forceEndCapturing) {
    console.log("Finishing capturing");
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    
    return;
  }
}


function setup() {
  if(CAPTURING) captureStart();
  realSetup();
}

function draw() {

  if(CAPTURING) frameCaptureStart();
  realDraw();
  
  if(forceEndCapturing && LAST_SCENE_CAPTURE) {
    saveCanvas('lastScene','png');
  }
  
  if(CAPTURING) frameCaptureEnd();
}