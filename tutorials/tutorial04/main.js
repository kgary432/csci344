let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // invoke any drawing functions inside of setup.
  // functions should all go between "createCanvas()" and "drawGrid()"
  draw5Circles();
  // draw5RedSquares();
  drawGrid(canvasWidth, canvasHeight);
}

// my first function
function draw5Circles() {
  noFill();
  // fill('red');
  let x = 100;
  let y = 200;
  let d = 50;
  while (y <= 400) {
    circle(x, y, d); // centerX, centerY, radius
    y += 50;
  }
}

function draw5RedSquares() {
  fill("red");
  square(320, 200, 50); // topLeftX, topLeftY, width
  square(320, 250, 50);
  square(320, 300, 50);
  square(320, 350, 50);
  square(320, 400, 50);
}
