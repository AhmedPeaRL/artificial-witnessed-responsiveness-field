function dissolveBoundaries() {
  particles.forEach(p => {
    if (
      p.x < -50 || p.x > W + 50 ||
      p.y < -50 || p.y > H + 50
    ) {
      p.life *= 0.95;
    }
  });
}

setInterval(dissolveBoundaries, 200);
