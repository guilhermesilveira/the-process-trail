const FILE_POSITIONING_ANGLE = 0;
const FILE_POSITIONING_MATRIX = 1;
const FILE_POSITIONING_MATRIX_RANDOM = 2;


let currentFiles = 0;
let currentLog = 0;

function angleBasedFile(k) {
  const angle = TWO_PI / currentFiles * k;
  return p5.Vector.fromAngle(angle);
}


let squareCounter = 1;
function matrixBasedFile(k) {
  while(squareCounter * squareCounter < currentFiles) {
    squareCounter += 1;
    console.log("Updating square to size=" + squareCounter);
  }
  return createVector(k / squareCounter - squareCounter / 2.0,
                      k % squareCounter - squareCounter / 2.0).limit(1);  
}



let filePositions = [];
function matrixBasedRefreshingFile(k) {
  refresh = false;
  while(squareCounter * squareCounter < currentFiles) {
    squareCounter += 1;
    console.log("Updating square to size=" + squareCounter);    
    refresh = true;
  }
  if(refresh) {
    filePositions = permutation(squareCounter * squareCounter);
  }
  const z = filePositions[k];
  return createVector(z / squareCounter - squareCounter / 2.0,
                      z % squareCounter - squareCounter / 2.0).limit(1);  
}

function getFile(k) {
  currentFiles = max(currentFiles, k);
  if(FILE_POSITIONING==FILE_POSITIONING_MATRIX) {
    return matrixBasedFile(k);
  }
  if(FILE_POSITIONING==FILE_POSITIONING_ANGLE) {
   return angleBasedFile(k);
  }
  return matrixBasedRefreshingFile(k);
}
