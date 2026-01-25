function spawnParticle(x, y, intensity) {
  particles.push({
    x, y,
    vx: (Math.random() - 0.5) * intensity,
    vy: (Math.random() - 0.5) * intensity,
    life: 1
  });
}

function flow() {
  ctx.clearRect(0,0,W,H);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.002;

    ctx.fillStyle = `rgba(200,200,200,${p.life})`;
    ctx.fillRect(p.x, p.y, 1, 1);
  });

  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].life <= 0) particles.splice(i,1);
  }

  requestAnimationFrame(flow);
}

flow();
