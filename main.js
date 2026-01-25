import { Field, tick, disturb, updatePresence } from "./field.js";
import { involuntaryPulse } from "./field/involuntary-pulse.js";
import { manifest } from "./manifestation/particles.js";
import { enforceSilence } from "./silence/silence.js";

enforceSilence();

/* ---------------- Canvas ---------------- */
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ---------------- Particles ---------------- */
const COUNT = 180;
const particles = Array.from({ length: COUNT }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: 0,
  vy: 0,
  r: Math.random() * 1.4 + 0.4,
}));

/* ---------------- Presence ---------------- */
function handleMove(x, y) {
  updatePresence(x / canvas.width, y / canvas.height);
}

canvas.addEventListener("mousemove", e =>
  handleMove(e.clientX, e.clientY)
);

canvas.addEventListener("touchmove", e => {
  const t = e.touches[0];
  handleMove(t.clientX, t.clientY);
});

/* ---------------- Input (Silent Disturbance) ---------------- */
const input = document.getElementById("input");

input.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;

  const value = input.value.trim();
  if (!value) return;

  const weight = Math.min(0.6, value.length / 18);
  disturb(weight);

  manifest({ value, decay: 2200 });
  input.value = "";
});

/* ---------------- Loop ---------------- */
function loop() {
  requestAnimationFrame(loop);

  tick(0.002);
  involuntaryPulse(disturb);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = Field.presence.x * canvas.width;
  const cy = Field.presence.y * canvas.height;

  particles.forEach(p => {
    const dx = cx - p.x;
    const dy = cy - p.y;

    const influence =
      0.00035 +
      Field.breath * 0.0006 +
      Field.disturbance * 0.002;

    p.vx += dx * influence;
    p.vy += dy * influence;

    p.vx *= 0.92;
    p.vy *= 0.92;

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fill();
  });
}

loop();
