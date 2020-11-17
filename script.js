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
let rate = 10;

let x = 0;
let y = 0;
let px = 0;
let py = 0;

// make a snake object
let snake = {
  size: 20,
  x: Math.ceil(innerWidth / 2 / 20) * 20,
  y: Math.ceil(innerHeight / 2 / 20) * 20,
  dx: 20,
  dy: 0,
  tail: [
    { x: innerWidth + 20, y: innerHeight + 20 },
    { x: innerWidth + 20, y: innerHeight + 20 },
    { x: innerWidth + 20, y: innerHeight + 20 }
  ]
};

// make an apple object
let apple = {
  x:
    Math.ceil(
      Math.floor(Math.random() * (innerWidth - snake.size * 2) + 1) / snake.size
    ) * snake.size,
  y:
    Math.ceil(
      Math.floor(Math.random() * (innerHeight - snake.size * 2) + 1) /
        snake.size
    ) * snake.size
};

// store previous positions
let pre = {
  x: snake.x,
  y: snake.y,
  size: 20
};

const color = [
  [219, 56, 56],
  [246, 98, 31],
  [254, 204, 47],
  [178, 194, 37],
  [64, 164, 216],
  [163, 99, 217],
  [238, 101, 122]
];

// initialize the setup
function setup() {
  // fit the canvas to the screen
  createCanvas(innerWidth, innerHeight);
  frameRate(rate);
  noStroke();
  //snake.dx = snake.size;
}
let colorInt = 1;

// draw each frame
function draw() {
  // clear the canvas
  background(0);
  textSize(32);
  text("Score: " + (snake.tail.length - 3) * 5, 10, 30);

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
    fill(color[colorInt][0], color[colorInt][1], color[colorInt][2]);
    if (colorInt === 6) {
      colorInt = 0;
    } else {
      colorInt++;
    }
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
  colorInt = 1;
  // draw the head
  fill(color[0][0], color[0][1], color[0][2]);
  rect(snake.x, snake.y, snake.size, snake.size);
  fill(100, 255, 0);

  // add the apple
  fill(Math.floor(Math.random() * 100) + 155, 0, 0);
  rect(apple.x, apple.y, snake.size, snake.size);
  fill(100, 255, 0);

  text("Score: " + (snake.tail.length - 3) * 5, 10, 30);

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
      rate = 0;
    }
  }
  DetectCollide();
}

function DetectCollide() {
  // detect when you hit the sides
  /*if (
    snake.x < 0 ||
    snake.x > innerWidth - snake.size / 2 ||
    snake.y < 0 ||
    snake.y > innerHeight - snake.size / 2
  ) {
    frameRate(0);
    rate = 0;
    setTimeout(function() {
      frameRate(10);
      rate = 10;
      direction = "right";
      snake = {
        size: 20,
        x: Math.ceil(innerWidth / 2 / 20) * 20,
        y: Math.ceil(innerHeight / 2 / 20) * 20,
        dx: 20,
        dy: 0,
        tail: [
          { x: innerWidth + 20, y: innerHeight + 20 },
          { x: innerWidth + 20, y: innerHeight + 20 },
          { x: innerWidth + 20, y: innerHeight + 20 }
        ]
      };
    }, 1000);
  }*/
  if (snake.x < 0) {
    snake.x = Math.floor(innerWidth / snake.size) * snake.size;
  } else if (snake.x > innerWidth - snake.size / 2) {
    snake.x = 0;
  } else if (snake.y < 0) {
    snake.y = Math.floor(innerHeight / snake.size) * snake.size;
  } else if (snake.y > innerHeight - snake.size / 2) {
    snake.y = 0;
  }
  if (snake.x === apple.x && snake.y == apple.y) {
    apple.x =
      Math.ceil((Math.floor(Math.random() * innerWidth) + 1) / snake.size) *
      snake.size;
    apple.y =
      Math.ceil((Math.floor(Math.random() * innerHeight) + 1) / snake.size) *
      snake.size;
    while (
      apple.y >= innerHeight - snake.size ||
      apple.x >= innerWidth - snake.size
    ) {
      apple.x =
        Math.ceil((Math.floor(Math.random() * innerWidth) + 1) / snake.size) *
        snake.size;
      apple.y =
        Math.ceil((Math.floor(Math.random() * innerHeight) + 1) / snake.size) *
        snake.size;
    }
    if (apple.y === snake.y && apple.x === snake.x) {
      apple.x =
        Math.ceil((Math.floor(Math.random() * innerWidth) + 1) / snake.size) *
        snake.size;
      apple.y =
        Math.ceil((Math.floor(Math.random() * innerHeight) + 1) / snake.size) *
        snake.size;
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
  } else if (e.key === "r") {
    location.reload();
  } else if (e.key === "e") {
    frameRate(rate * 2);
  } else if (e.key === "q") {
    frameRate(rate / 2);
  } else if (e.key === "x") {
    if (rate > 6) {
      rate /= 2;
    } else {
      rate *= 2;
    }
    frameRate(rate);
  } else if (e.key === "z") {
    if (rate < 11) {
      rate *= 2;
    } else {
      rate /= 2;
    }
    frameRate(rate);
  } else if (e.keyCode === 38 && snake.dy === 0) {
    direction = "up";
  } else if (e.keyCode === 40 && snake.dy === 0) {
    direction = "down";
  } else if (e.keyCode === 39 && snake.dx === 0) {
    direction = "right";
  } else if (e.keyCode === 37 && snake.dx === 0) {
    direction = "left";
  }
};

document.onkeyup = function(e) {
  if (e.key === "e" || e.key === "q") {
    frameRate(rate);
  }
};

document.ontouchstart = function(e) {
  //e.preventDefault();
  px = e.touches[0].clientX;
  py = e.touches[0].clientY;
};

document.ontouchmove = function(e) {
  e.preventDefault();
  x = e.touches[0].clientX;
  y = e.touches[0].clientY;

  if (Math.abs(px - x) > Math.abs(py - y)) {
    if (px > x && snake.dx === 0) {
      direction = "left";
    } else if (px < x && snake.dx === 0) {
      direction = "right";
    }
  } else if (Math.abs(px - x) < Math.abs(py - y)) {
    if (py > y && snake.dy === 0) {
      direction = "up";
    } else if (py < y && snake.dy === 0) {
      direction = "down";
    }
  }
};
