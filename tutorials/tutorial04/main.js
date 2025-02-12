let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

function setup() {
  // sets up the canvas:
  createCanvas(canvasWidth, canvasHeight);

  // code invoking the function you just wrote:
  drawNShapesDirectionFlexible(30, 30, 335, 0, "square", "column");
  drawNShapesDirectionFlexible(4, 100, 120, 200, "circle", "row");
  drawNShapesDirectionFlexible(8, 50, 725, 425, "circle", "row");

  // draws grid at the end:
  drawGrid(canvasWidth, canvasHeight);
}

function drawNShapesDirectionFlexible(n, size, x, y, shape, direction) {
  fill("lightblue");
  for (let i = 0; i < n; i++) {
    if (shape === "circle") {
      circle(x, y, size);
    } else if (shape === "square") {
      fill("lightgreen");
      square(x, y, size);
    }

    if (direction === "vertical") {
      y += size;
    } else if (direction === "horizontal") {
      x += size;
    }
  }
}
