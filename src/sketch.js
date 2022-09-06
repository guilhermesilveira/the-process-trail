// CONFIGURATIONS

// Capture to video
const CAPTURING = false;

// Methods: TRACE, FULL, RANDOM, METHOD_TRIPLE
const METHOD = METHOD_TRIPLE;

// Where to create new centers
// CREATION_METHOD_CENTER, CREATION_METHOD_AUTHOR_CENTER
const CREATION_METHOD = CREATION_METHOD_CENTER;

// file positioning: matrixBasedFile, matrixBasedRefreshingFile
// FILE_POSITIONING_MATRIX
// FILE_POSITIONING_MATRIX_RANDOM
// FILE_POSITIONING_ANGLE
const FILE_POSITIONING = FILE_POSITIONING_MATRIX_RANDOM;

// change if you want to force it
const SEED = null;

// should it rotate while being plotted? null or function
// const SHOULD_ROTATE = null;
const SHOULD_ROTATE = () => noise(frameCount) / 3000;

// git to load
// processing4, p5.js, openFrameworks
const NAME = "https://raw.githubusercontent.com/guilhermesilveira/theprocesstrail-logs/main/processing4-log.json";

// speed
const SPEED = 1.5;

// dimensions
const SIZE = 800;

// colors
function setupColors() {
  BACKGROUND = color(0, 0, 0);
}






// other capturing settings
// Duration in milliseconds to capture, null to force stop when finished
const CAPTURE_DURATION = null;

// Whether to download the last scene as a png file
const LAST_SCENE_CAPTURE = false;




// everything else

let BACKGROUND;

let logs;
function preload() {
  let uri =
   'https://guilhermesilveira.github.io/theprocesstrail-logs/' + NAME + '-log.json';
  if(NAME.startsWith('http')) {
    uri = NAME;
  }
  logs = loadJSON(uri);
}

function setupSeed() {
  if(SEED == null) {
    // deterministic seed according to length
    randomSeed(logCount);
    noiseSeed(logCount);
  } else {
    // deterministic seed according to pre-defined value
    randomSeed(SEED);
    noiseSeed(SEED);
  }
}

let logCount;

function realSetup() {
  createCanvas(SIZE, SIZE);
  setupBuffer(SIZE, SIZE);
  setupColors();
  background(BACKGROUND);
  buffer.background(BACKGROUND);
  logCount = Object.keys(logs).length;
  setupSeed();
}

function processLog(log) {
  const author = getAuthor(log.author);
  const delta = log.delta;
  buffer.push();
  buffer.translate(SIZE / 2, SIZE / 2);
  for(const k in log.files) {
    const file = getFile(k);
    author.move(file, log.files[k]);
    author.draw();
  }
  buffer.pop();
}

function shouldStop() {
  return currentLog >= logCount;
}

function realDraw() {
  
  for(let i = 0; i <= SPEED * 10; i++){
    
    if (currentLog % 100 == 0)
      console.log(currentLog + "/" + logCount);
    
    processLog(logs[currentLog]);
    // TODO: draw the points of the files?
    
    if(SHOULD_ROTATE != null) {
      bufferRotate(SHOULD_ROTATE());
    }
    
    bufferPlot();

    currentLog++;
    if(shouldStop()) {
      noLoop();
      console.log("Frame count " + frameCount);
      forceEndCapturing = true;
      break;
    }
  }
  
}