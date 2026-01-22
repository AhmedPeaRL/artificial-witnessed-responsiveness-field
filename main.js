// main.js
import { createVisualPhysicalWitness } from "./field/visual-physical-witness/index.js";
import { attachSilenceWitness } from "./field/silence-witness/index.js";
import { registerPerceptualFailure } from "./field/perceptual-failure-witness/index.js";
import { attachTemporalWitness } from "./field/temporal-residual-witness/index.js";
import { PerceptualDriftBoundary } from './field/perceptual-drift-boundary.js';
import { registerMisalignment } from "./field/witnessed-misalignment-trace/index.js";
import { writeField } from "../shared-field.js";
import { observeContradiction } from "./field/contradiction-witness/index.js";

// === Canvas Setup ===
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// === Visual / Physical Witness ===
const visualWitness = createVisualPhysicalWitness(canvas, ctx);

// === Target (Observer Presence) ===
let targetX = canvas.width / 2;
let targetY = canvas.height / 2;
let lastMove = Date.now();

canvas.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
  lastMove = Date.now();
});

// === Silence Witness ===
attachSilenceWitness(6000);
attachTemporalWitness(field);

// === Animation Loop ===
function loop() {
  const now = Date.now();
  const idleTime = now - lastMove;

  // إذا الحركة عنيفة جدًا → فشل إدراك
  if (Math.abs(targetX - canvas.width / 2) > canvas.width * 0.45) {
    registerPerceptualFailure();
  }

  visualWitness.update(targetX, targetY);
  visualWitness.draw();
  

  observeContradiction(fieldState);
  fieldState.energy *= 0.9992;
  fieldState.motion += Math.random() * 0.0001;
  
  requestAnimationFrame(loop);
}

loop();
