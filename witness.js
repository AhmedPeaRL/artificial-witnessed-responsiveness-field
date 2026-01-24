import { semanticDisturbance } from "./field/semantic-disturbance-gate.js";

let ctx;
let particles = [];
let disturbance = 0;

export function initField(canvas) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  particles = Array.from({ length: 260 }, createParticle);

  animate();
}

function createParticle() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.8 + 0.4
  };
}

export function disturbField(seed) {
  const intensity = Math.min(seed.length / 8, 3);
  disturbance += intensity * 4;

  const semantic = semanticDisturbance();
  particles.forEach(p => {
    const angle = Math.random() * Math.PI * 2;
    p.vx += Math.cos(angle) * intensity;
    p.vy += Math.sin(angle) * intensity;
  });
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  disturbance *= 0.92;

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    p.vx *= 0.96;
    p.vy *= 0.96;

    wrap(p);

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r + disturbance * 0.03, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${semantic.hue}, 100%, 85%, ${0.5 + semantic.depth * 0.12})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

function wrap(p) {
  if (p.x < 0) p.x = window.innerWidth;
  if (p.x > window.innerWidth) p.x = 0;
  if (p.y < 0) p.y = window.innerHeight;
  if (p.y > window.innerHeight) p.y = 0;
}
