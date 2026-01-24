import { semanticDisturbance } from "./field/semantic-disturbance-gate.js";

let ctx;
let particles = [];

export function initField(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx = canvas.getContext("2d");

  particles = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: 0,
    vy: 0,
    r: Math.random() * 1.4 + 0.4
  }));

  animate();
}

export function disturbField(seed = "") {
  const force = Math.min(seed.length / 6, 3);

  particles.forEach(p => {
    const a = Math.random() * Math.PI * 2;
    p.vx += Math.cos(a) * force;
    p.vy += Math.sin(a) * force;
  });
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  const semantic = semanticDisturbance();

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    p.vx *= 0.94;
    p.vy *= 0.94;

    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${semantic.hue},100%,85%,${0.45 + semantic.depth * 0.15})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
