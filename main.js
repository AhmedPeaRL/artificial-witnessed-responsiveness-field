// main.js
import { createVisualPhysicalWitness } from "./field/visual-physical-witness/index.js";
import { attachSilenceWitness } from "./field/silence-witness/index.js";
import { attachTemporalWitness } from "./field/temporal-residual-witness/index.js";
import { registerPerceptualFailure } from "./field/perceptual-failure-witness/index.js";
import { registerMisalignment } from "./field/witnessed-misalignment-trace/index.js";
import { readField, observeField } from "./field/shared-field.js";
import { observeContradiction } from "./field/contradiction-witness/index.js";
import { initField, disturbField } from './witness.js';

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

const canvas = document.getElementById('field-canvas');
const input = document.getElementById('witness-input');

// === Visual Witness ===
const visualWitness = createVisualPhysicalWitness(canvas, ctx);

// === Presence Tracking ===
let targetX = canvas.width / 2;
let targetY = canvas.height / 2;
let lastMove = Date.now();

initField(canvas);

let lock = false;

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !lock) {
    lock = true;

    const value = input.value.trim();
    input.value = '';

    disturbField(value);

    setTimeout(() => {
      lock = false;
    }, 1200);
    
canvas.addEventListener("mousemove", e => {
  targetX = e.clientX;
  targetY = e.clientY;
  lastMove = Date.now();
});

// === Witnesses ===
attachSilenceWitness(6000);
attachTemporalWitness({
  snapshot: () => [],
  findNearest: () => null
});

// === Silence → UI coupling ===
observeField(state => {
  if (state.silence) {
    document.body.classList.add("silence-state");
  } else {
    document.body.classList.remove("silence-state");
  }
});

// === Animation Loop ===
function loop() {
  const state = readField();

  if (state.motionEnergy > 0.95 && state.silence) {
    registerPerceptualFailure();
  }

  if (state.strain > 0.55 && Math.random() < 0.002) {
    registerMisalignment(1);
  }

  observeContradiction(state);

  visualWitness.update(targetX, targetY);
  visualWitness.draw();

  requestAnimationFrame(loop);
}

loop();
