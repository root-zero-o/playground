import { debounce } from "../../utils/debounce.js";

const CANVAS_ID = "bouncing_ball_canvas";
const CANVAS_WRAPPER_ID = "canvas_wrapper";

const BALL_SIZE = 50;
const DROP_SPEED = 2;
const GRAVITY = 0.5;
const BOUNCE = 0.9;
const MIN_SPEED = 2.6;

const canvas = document.getElementById(CANVAS_ID);
const wrapper = document.getElementById(CANVAS_WRAPPER_ID);

const canvasWall = {
  leftTop: [BALL_SIZE, BALL_SIZE],
  rightBottom: [canvas.width - BALL_SIZE, canvas.height - BALL_SIZE],
};

const ctx = canvas.getContext("2d");

const cursor = {
  x: 0,
  y: 0,
};

const ball = {
  x: 0,
  y: 0,
  isDropping: false,
  isStop: false,
  speed: 0,
};

// ----------

controlResize();

saveCursorLocationOnMouseMove();

clickToDrop();

loop();

// -----------

function changeDirection() {
  if (ball.speed <= MIN_SPEED) {
    ball.speed = 0;
    ball.isStop = true;
  } else {
    ball.speed += GRAVITY;
    ball.speed *= -1;
    ball.speed *= BOUNCE;
  }
}

function checkHitWall(x, y) {
  if (x <= canvasWall.leftTop[0]) {
    ball.x = canvasWall.leftTop[0];
  }

  if (x >= canvasWall.rightBottom[0]) {
    ball.x = canvasWall.rightBottom[0];
  }

  if (y <= canvasWall.leftTop[1]) {
    ball.y = canvasWall.leftTop[1];
  }

  if (y >= canvasWall.rightBottom[1]) {
    ball.y = canvasWall.rightBottom[1];
    changeDirection();
  }
}

function setCanvasSizeByWrapperSize() {
  const { clientWidth, clientHeight } = wrapper;

  canvas.setAttribute("width", clientWidth);
  canvas.setAttribute("height", clientHeight);

  canvasWall.rightBottom[0] = clientWidth - BALL_SIZE;
  canvasWall.rightBottom[1] = clientHeight - BALL_SIZE;
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
  if (ball.isStop) return;
  ball.speed += GRAVITY;
  ball.y += ball.speed;

  checkHitWall(ball.x, ball.y);
}

function updateBallLocationOnCursor() {
  ball.x = cursor.x;
  ball.y = cursor.y;
}

function clickToDrop() {
  canvas.onclick = function () {
    ball.isDropping = true;
    ball.speed = DROP_SPEED;
    ball.isStop = false;
  };
}
