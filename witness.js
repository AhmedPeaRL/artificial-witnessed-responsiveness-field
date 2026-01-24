let ctx, particles = [];

export function initField(canvas) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  particles = Array.from({ length: 220 }, () => createParticle());

  animate();
}

function createParticle() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: 0,
    vy: 0,
    r: Math.random() * 1.6 + 0.3,
    life: Math.random()
  };
}

export function disturbField(seed) {
  const intensity = Math.min(seed.length / 12, 2);

  particles.forEach(p => {
    const angle = Math.random() * Math.PI * 2;
    const force = (Math.random() * 3 + 1) * intensity;

    p.vx += Math.cos(angle) * force;
    p.vy += Math.sin(angle) * force;
  });
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    p.vx *= 0.92;
    p.vy *= 0.92;

    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fill();
  });

  requestAnimationFrame(animate);
      }
