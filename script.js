/*
                          TODO
                X make a snake object
                  > x and y coords
                  > size
                  > tail array of objects of x and y coords ex: [{x: , y: }]
                X loop through and draw tail
                  > make a py and px variable to store the previous coordinates
                X create movement
                * die when hit edges
                * add apple and spawn random
                * delete apple when you eat it, and move it
                * add one to the tail of the snake when you eat an apple
                * die when you hit yourself
                * add score
                * (optional) add sound effects
                * (optional) mobile compatible
                
*/

let direction = "";

// make a snake object
let snake = {
  size: 40,
  x: Math.ceil(innerWidth / 2 / 40) * 40,
  y: Math.ceil(innerHeight / 2 / 40) * 40,
  dx: 40,
  dy: 0,
  tail: [
    { x: innerWidth + 40, y: innerHeight + 40 },
    { x: innerWidth + 40, y: innerHeight + 40 },
    { x: innerWidth + 40, y: innerHeight + 40 }
  ]
};

// make an apple object
let apple = {
  x: Math.ceil(Math.floor(Math.random() * (innerWidth - 80) + 1) / 40) * 40,
  y: Math.ceil(Math.floor(Math.random() * (innerHeight - 80) + 1) / 40) * 40
};

// store previous positions
let pre = {
  x: snake.x,
  y: snake.y
};

// initialize the setup
function setup() {
  // fit the canvas to the screen
  createCanvas(innerWidth, innerHeight);
  frameRate(10);
  noStroke();
  snake.dx = snake.size;
}

// draw each frame
function draw() {
  // clear the canvas
  background(0);
  text("Score: " + snake.tail.length, 10, 30);

  if (direction === "right") {
    MoveRight();
  } else if (direction === "left") {
    MoveLeft();
  } else if (direction === "up") {
    MoveLeft();
  } else if (direction === "down") {
    MoveDown();
  }

  // loop through and draw the tail
  for (let i = 0; i < snake.tail.length; i++) {
    fill(60 + i * 5, 255, 0);
    rect(pre.x, pre.y, snake.size, snake.size);
    snake.tail[i].x = snake.tail[i].x + pre.x;
    pre.x = snake.tail[i].x - pre.x;
    snake.tail[i].x = snake.tail[i].x - pre.x;
    snake.tail[i].y += pre.y;
    pre.y = snake.tail[i].y - pre.y;
    snake.tail[i].y -= pre.y;
  }
  if (direction === "right") {
    MoveRight();
  } else if (direction === "left") {
    MoveLeft();
  } else if (direction === "up") {
    MoveLeft();
  } else if (direction === "down") {
    MoveDown();
  }

  // draw the head
  fill(0, 255, 0);
  rect(snake.x, snake.y, snake.size, snake.size);
  fill(100, 255, 0);

  // add the apple
  fill(255, 0, 0);
  rect(apple.x, apple.y, snake.size, snake.size);
  fill(100, 255, 0);

  pre.x = snake.x;
  pre.y = snake.y;
  if (direction === "right") {
    MoveRight();
  } else if (direction === "left") {
    MoveLeft();
  } else if (direction === "up") {
    MoveUp();
  } else if (direction === "down") {
    MoveDown();
  }

  snake.x += snake.dx;
  snake.y += snake.dy;

  for (let j = 0; j < snake.tail.length; j++) {
    if (snake.tail[j].x === snake.x && snake.tail[j].y === snake.y) {
      frameRate(0);
    }
  }
  DetectCollide();
}

function DetectCollide() {
  // detect when you hit the sides
  if (
    snake.x < -12 ||
    snake.x > innerWidth ||
    snake.y < -12 ||
    snake.y > innerHeight
  ) {
    frameRate(0);
  }
  if (snake.x === apple.x && snake.y == apple.y) {
    apple.x = Math.ceil((Math.floor(Math.random() * innerWidth) + 1) / 40) * 40;
    apple.y =
      Math.ceil((Math.floor(Math.random() * innerHeight) + 1) / 40) * 40;
    while (apple.y >= innerHeight - 40 || apple.x >= innerWidth - 40) {
      apple.x =
        Math.ceil((Math.floor(Math.random() * innerWidth) + 1) / 40) * 40;
      apple.y =
        Math.ceil((Math.floor(Math.random() * innerHeight) + 1) / 40) * 40;
    }
    if (apple.y === snake.y && apple.x === snake.x) {
      apple.x =
        Math.ceil((Math.floor(Math.random() * innerWidth) + 1) / 40) * 40;
      apple.y =
        Math.ceil((Math.floor(Math.random() * innerHeight) + 1) / 40) * 40;
    }
    snake.tail.push({ x: 0, y: 0 });
  }
}

function MoveRight() {
  snake.dx = snake.size;
  snake.dy = 0;
}

function MoveLeft() {
  snake.dx = -snake.size;
  snake.dy = 0;
}

function MoveUp() {
  snake.dy = -snake.size;
  snake.dx = 0;
}

function MoveDown() {
  snake.dy = snake.size;
  snake.dx = 0;
}

document.onkeydown = function(e) {
  if (e.key === "d" && snake.dx === 0) {
    direction = "right";
  } else if (e.key === "a" && snake.dx === 0) {
    direction = "left";
  } else if (e.key === "w" && snake.dy === 0) {
    direction = "up";
  } else if (e.key === "s" && snake.dy === 0) {
    direction = "down";
  }
};
