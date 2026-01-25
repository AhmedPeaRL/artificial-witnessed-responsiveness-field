// field/shared-field.js
// Holds instantaneous field state without persistence or recall.

const fieldState = {
  disturbance: 0,
  strain: 0
};

export function readField() {
  return { ...fieldState };
}

export function writeField(partial) {
  if (typeof partial.disturbance === "number") {
    fieldState.disturbance = Math.max(0, partial.disturbance);
  }

  if (typeof partial.strain === "number") {
    fieldState.strain = Math.max(0, partial.strain);
  }
}
