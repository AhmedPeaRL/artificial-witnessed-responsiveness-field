import { readField, writeField } from "./field/shared-field.js";
import { autonomousTemporalDrift } from "./field/autonomous-temporal-drift.js";

// Canvas setup
const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Initial field seed (non-zero, non-stable)
writeField({
  disturbance: Math.random() * 0.02,
  strain: Math.random() * 0.01
});

let lastFrame = performance.now();

function loop(now) {
  const delta = now - lastFrame;
  lastFrame = now;

  // --- Autonomous evolution ---
  autonomousTemporalDrift();

  const state = readField();

  // Natural decay without reset
  writeField({
    disturbance: state.disturbance * 0.9996,
    strain: state.strain * 0.9998
  });

  // --- Rendering ---
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const fade = 0.4 + Math.min(state.strain * 0.3, 0.3);
  ctx.fillStyle = `rgba(255,255,255,${fade})`;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  const radius =
    Math.min(canvas.width, canvas.height) *
    (0.12 + state.disturbance);

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
