import { debounce } from "../../utils/debounce.js";

const CANVAS_ID = "bouncing_ball_canvas";
const CANVAS_WRAPPER_ID = "canvas_wrapper";

const canvas = document.getElementById(CANVAS_ID);
const wrapper = document.getElementById(CANVAS_WRAPPER_ID);

const ctx = canvas.getContext("2d");

const cursor = {
  x: 0,
  y: 0,
};

// ----------

controlResize();

drawBallOnMouseMove();

loop();

// -----------

function setCanvasSizeByWrapperSize() {
  const { clientWidth, clientHeight } = wrapper;

  canvas.setAttribute("width", clientWidth);
  canvas.setAttribute("height", clientHeight);
}

function controlResize() {
  setCanvasSizeByWrapperSize();

  const debouncedCanvasSize = debounce(setCanvasSizeByWrapperSize, 300);
  window.addEventListener("resize", debouncedCanvasSize);
}

function drawBallOnMouseMove() {
  canvas.onmousemove = function (event) {
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;

    drawBall();
  };
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(cursor.x, cursor.y, 50, 0, Math.PI * 2);
  ctx.fillStyle = "rgb(255, 165, 0)";
  ctx.fill();
}

function eraseCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function loop() {
  eraseCanvas();
  drawBall();

  requestAnimationFrame(loop);
}
