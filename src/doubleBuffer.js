// TODO use OO and support multiple buffers

// double buffer
let buffer;
let bufferRotation = 0;

function setupBuffer(w, h) {
  buffer = createGraphics(w, h);
}

function bufferPlot() {
  push();
  imageMode(CENTER);
  // console.log(bufferRotation);
  translate(width / 2, height / 2);
  rotate(bufferRotation);
  //console.log(width);
  image(buffer, 0, 0);
  pop();
}

function bufferRotate(rotation) {
  bufferRotation += rotation;
}