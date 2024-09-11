const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");
const checkpointMessage = document.querySelector(".checkpoint-screen > p");
// console.log(checkpointMessage)

const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.5;
let isCheckpointCollisionDetectionActive = true;

// size of element
const proportionalSize = (size) => {
  return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
};

// characteristics of the player
class Player {
  constructor() {
    // the proportionalSize function make sure that the player's position is always proportional to the screen size.
    this.position = {
      x: proportionalSize(10),
      y: proportionalSize(400),
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    // The velocity property store the player's speed in the x and y directions.
    this.width = proportionalSize(40);
    this.height = proportionalSize(40);
    // proportionalSize() function set the width & height properties of your class to be proportional to the height of the screen.
  }
  draw() {
    ctx.fillStyle = "#99c9ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = gravity;
      }
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
    // ensure that the player stays within the boundaries of the canvas screen
    if (this.position.x < this.width) {
      this.position.x = this.width;
    }
    // ensure that the player's x position will never exceed the right edge of the canvas.
    if (this.position.x >= canvas.width - this.width * 2) {
      this.position.x = canvas.width - this.width * 2;
    }
  }
}
const player = new Player();

const startGame = () => {
  canvas.style.display = "block";
  startScreen.style.display = "none";
  // player.draw();
  animate();
}


// moving player across the screen
const animate = () => {
  // update the animation on the screen.
  requestAnimationFrame(animate);
  //  clear the canvas before rendering the next frame of the animation.
  ctx.clearRect(0,0,canvas.width, canvas.height)
  // update the player's position as it moves 
  player.update();
  
  if(keys.rightKey.pressed && player.position.x < proportionalSize(400)){
    player.velocity.x = 5
  } else if(keys.leftKey.pressed && player.position.x > proportionalSize(100)){
    player.velocity.x = -5
  } else {
    player.velocity.x = 0
  }
}

// Player movement
const keys = {
  rightKey: {
    pressed: false
  },
  leftKey: {
    pressed: false
  },
}

// Responsible for moving the player across the screen.
const movePlayer = (key,xVelocity, isPressed) => {
  if(!isCheckpointCollisionDetectionActive){
    player.velocity.x = 0;
    player.velocity.y = 0;
    return
  }
  switch (key) {
    case "ArrowLeft":
      keys.leftKey.pressed = isPressed
      if(xVelocity === 0){
        player.velocity.x = xVelocity
      }
      player.velocity.x -= xVelocity
      break;
      case "ArrowUp":
        case "Spacebar":
          case " ":
            player.velocity.y -= 8
            break;
            case "ArrowRight":
      keys.rightKey.pressed = isPressed
      if(xVelocity === 0){
        player.velocity.x = xVelocity
      }
      player.velocity.x += xVelocity
    }
  }
  
  // Even listeners for the player movement
  startBtn.addEventListener('click', startGame);

  window.addEventListener('keydown', ({ key }) => {
    movePlayer(key, 8, true)
  })

  window.addEventListener('keyup', ({ key }) => {
    movePlayer(key, 0, false)
  })