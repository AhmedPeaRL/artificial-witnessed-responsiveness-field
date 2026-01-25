(function () {
  let drift = { x: 0, y: 0 };

  function evolve() {
    drift.x += (Math.random() - 0.5) * 0.0004;
    drift.y += (Math.random() - 0.5) * 0.0004;

    drift.x *= 0.998;
    drift.y *= 0.998;

    setTimeout(evolve, 120);
  }

  evolve();

  window.AWRF_DRIFT = {
    get: () => ({ ...drift })
  };
})();
