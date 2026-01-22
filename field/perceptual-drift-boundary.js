// Perceptual Drift Boundary
// This layer introduces rare, subtle shifts in perceived response.
// No announcements. No memory. No intent.

export const PerceptualDriftBoundary = (() => {
  let drift = 0;
  let active = false;
  let timeoutId = null;

  function maybeTrigger() {
    if (active) return;

    // Extremely low probability per frame
    if (Math.random() < 0.00015) {
      activate();
    }
  }

  function activate() {
    active = true;

    // Small perceptual deviation
    drift = (Math.random() * 0.14 - 0.07); // -7% to +7%

    // Drift exists briefly, then dissolves
    timeoutId = setTimeout(() => {
      drift = 0;
      active = false;
    }, 1200 + Math.random() * 1800);
  }

  function apply(value) {
    maybeTrigger();
    return value * (1 + drift);
  }

  return {
    apply
  };
})();
