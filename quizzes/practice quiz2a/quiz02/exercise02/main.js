const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // function invocations goes here:
  drawMonster(100, 100, 150, "#0bc9cd", false);
  drawMonster(300, 200, 75, "#8093f1", true);
  drawMonster(100, 325, 100, "#8093f1", false);
  drawMonster(250, 375, 125, "#7fb285", true);
  drawMonster(550, 200, 250, "#7fb285", false);
  drawGrid(canvasWidth, canvasHeight);
}

// function definition goes here:
function drawMonster(x, y, size, color, isSurprised) {
  rectMode(CENTER);
  fill(color);
  rect(x, y, size, size);
  fill("white");
  const eyeXLeft = x - size / 4;
  const eyeYLeft = y - size / 4;
  const eyeXRight = x + size / 4;
  const eyeYRight = y - size / 4;
  const eyeWidth = size / 5;
  const pupilWidth = size / 10;

  rect(eyeXLeft, eyeYLeft, eyeWidth, eyeWidth);
  rect(eyeXRight, eyeYRight, eyeWidth, eyeWidth);
  fill("black");
  rect(eyeXLeft, eyeYLeft, pupilWidth, pupilWidth);
  rect(eyeXRight, eyeYRight, pupilWidth, pupilWidth);

  const mouthX = eyeXLeft + size / 4;
  const mouthY = eyeYLeft + size / 2;
  // if/else for mouth
  if (isSurprised) {
    rect(mouthX, mouthY, size / 3, size / 4);
  } else {
    rect(mouthX, mouthY, size / 1.8, size / 6);
  }
}
