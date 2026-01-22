export function createVisualPhysicalWitness(canvas, context) {
  const particles = [];
  const COUNT = 120;

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0
    });
  }

  function update(targetX, targetY) {
    particles.forEach(p => {
      const dx = targetX - p.x;
      const dy = targetY - p.y;

      p.vx += dx * 0.0006;
      p.vy += dy * 0.0006;

      p.vx *= 0.92;
      p.vy *= 0.92;

      p.x += p.vx;
      p.y += p.vy;
    });
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";

    particles.forEach(p => {
      context.beginPath();
      context.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
      context.fill();
    });
  }

  return { update, draw };
}
