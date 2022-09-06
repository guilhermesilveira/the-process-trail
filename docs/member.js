const CREATION_METHOD_AUTHOR_CENTER = 0;
const CREATION_METHOD_CENTER = 1;

const METHOD_TRACE = 0;
const METHOD_FULL = 1;
const METHOD_RANDOM = 2;
const METHOD_TRIPLE = 3;

function startingPosition() {
  
  if(CREATION_METHOD==CREATION_METHOD_AUTHOR_CENTER) {
    
    let position = createVector(0, 0);
    
    for(const member of members) {
      position = p5.Vector.add(position, member.position);
    }
    
    console.log(position.x + " " + members.length)
    position.div(members.length);
    console.log(position.x)
    return position;
  }
  
  return createVector(0, 0);  
}

class Member {
  
  // TODO: start in the middle of other members
  constructor(number) {
    this.number = number;
    this.color = color(random() * 255, random() * 255, random() * 255);
    this.position = startingPosition();
  }
  
  move(filePosition, changes) {
    
    let delta = 1;
    if(METHOD == METHOD_FULL) {
      delta = changes;
    } else if(METHOD == METHOD_RANDOM) {
      delta = random() * changes;
    } else if(METHOD == METHOD_TRIPLE) {
      delta = 3;
    }
    
    const direction = filePosition;
    direction.mult(delta);
    
    this.lastPosition = this.position.copy();
    
    this.position = p5.Vector.add(this.position, direction);
    
    this.position.limit(SIZE / 2);

  }
  
  draw() {
    buffer.stroke(this.color);
    buffer.strokeWeight(1);
    buffer.line(this.lastPosition.x, this.lastPosition.y,
         this.position.x, this.position.y);
  }
  
}

const members = [];


function getAuthor(k) {
  if(members.length < k) {
    console.log("Creating member " + k);
    members.push(new Member(k));
  }
  return members[k - 1];
}
