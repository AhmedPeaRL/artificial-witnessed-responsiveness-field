import { readField, writeField } from "./field/shared-field.js";
import { involuntaryPulse } from "./field/involuntary-pulse.js";
import { PerceptualDriftBoundary } from "./field/perceptual-drift-boundary.js";

const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

let W, H;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const particles = Array.from({ length: 220 }, () => spawn());

function spawn() {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: 0,
    vy: 0,
    life: 1
  };
}

canvas.addEventListener("mousemove", e => {
  writeField({
    presence: { x: e.clientX / W, y: e.clientY / H },
    motionEnergy: 0.6
  });
});

function loop() {
  requestAnimationFrame(loop);

  const state = readField();
  state.time += 0.01;

  involuntaryPulse(w => {
    writeField({ disturbance: w });
  });

  ctx.clearRect(0, 0, W, H);

  const cx = state.presence.x * W;
  const cy = state.presence.y * H;

  particles.forEach(p => {
    const dx = cx - p.x;
    const dy = cy - p.y;

    const influence = PerceptualDriftBoundary.apply(
      0.0006 + state.disturbance * 0.002
    );

    p.vx += dx * influence;
    p.vy += dy * influence;

    p.vx *= state.silence ? 0.88 : 0.94;
    p.vy *= state.silence ? 0.88 : 0.94;

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x += W;
    if (p.x > W) p.x -= W;
    if (p.y < 0) p.y += H;
    if (p.y > H) p.y -= H;

    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillRect(p.x, p.y, 1, 1);
  });

  writeField({
    disturbance: state.disturbance * 0.985
  });
}

loop();
