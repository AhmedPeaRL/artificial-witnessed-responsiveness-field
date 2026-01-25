setInterval(() => {
  particles.forEach(p => {
    p.vx *= 0.999;
    p.vy *= 0.999;
  });
}, 1000);
