// field/autonomous-temporal-drift.js
// Introduces slow, irreversible temporal drift.
// No input required. No memory retained. No reset.

import { readField, writeField } from "./shared-field.js";

let lastTick = Date.now();
let driftAccumulator = 0;

export function autonomousTemporalDrift() {
  const now = Date.now();
  const delta = now - lastTick;
  lastTick = now;

  // Time itself contributes disturbance
  driftAccumulator += delta * 0.0000004;

  // Clamp to prevent runaway
  driftAccumulator = Math.min(driftAccumulator, 0.08);

  const state = readField();

  writeField({
    disturbance: state.disturbance + driftAccumulator * 0.15,
    strain: Math.min(1, state.strain + driftAccumulator * 0.02)
  });
}
