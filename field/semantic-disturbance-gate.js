
export function semanticDisturbance() {
  const state = getFieldState();
  const contradictions = readContradictions();

  let hue = 0;
  let depth = 0;

  if (state.silence && state.motionEnergy > 0.4) {
    hue += 40;
    depth += 0.6;
  }

  if (state.strain > 0.5) {
    hue += 90;
    depth += 1.1;
  }

  if (contradictions.length > 0) {
    hue += contradictions.length * 25;
    depth += contradictions.length * 0.4;
  }

  return {
    hue: hue % 360,
    depth: Math.min(depth, 3)
  };
}
