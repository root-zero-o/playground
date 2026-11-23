import { debounce } from "../../utils/debounce.js";

const CANVAS_ID = "bouncing_ball_canvas";
const CANVAS_WRAPPER_ID = "canvas_wrapper";

const BALL_SIZE = 50;
const DROP_SPEED = 10;

const canvas = document.getElementById(CANVAS_ID);
const wrapper = document.getElementById(CANVAS_WRAPPER_ID);

const ctx = canvas.getContext("2d");

const cursor = {
  x: 0,
  y: 0,
};

const ball = {
  x: 0,
  y: 0,
  isDropping: false,
};

// ----------

controlResize();

saveCursorLocationOnMouseMove();

clickToDrop();

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

function saveCursorLocationOnMouseMove() {
  canvas.onmousemove = function (event) {
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;
  };
}

function drawBall(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, BALL_SIZE, 0, Math.PI * 2);
  ctx.fillStyle = "rgb(255, 165, 0)";
  ctx.fill();
}

function eraseCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function loop() {
  eraseCanvas();
  if (ball.isDropping) {
    updateBallLocationForDrop();
  } else {
    updateBallLocationOnCursor();
  }
  drawBall(ball.x, ball.y);

  requestAnimationFrame(loop);
}

function updateBallLocationForDrop() {
  const floorY = canvas.height - BALL_SIZE;
  const next = ball.y + DROP_SPEED;

  ball.y = Math.min(floorY, next);
}

function updateBallLocationOnCursor() {
  ball.x = cursor.x;
  ball.y = cursor.y;
}

function clickToDrop() {
  canvas.onclick = function () {
    ball.isDropping = true;
  };
}
