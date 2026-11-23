import { debounce } from "../../utils/debounce.js";

setCanvasSizeByWindowSize();

function setCanvasSizeByWindowSize() {
  const canvas = document.getElementById("bouncing_ball_canvas");
  const wrapper = document.getElementById("canvas_wrapper");
  canvas.setAttribute("width", wrapper.clientWidth);
  canvas.setAttribute("height", wrapper.clientHeight);
}

const debouncedCanvasSize = debounce(setCanvasSizeByWindowSize, 300);

window.addEventListener("resize", debouncedCanvasSize);
