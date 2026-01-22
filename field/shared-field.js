// field/shared-field.js

const fieldState = {
  presence: null,
  motionEnergy: 0,
  silence: false,
  strain: 0,
};

const listeners = new Set();

export function writeField(patch) {
  Object.assign(fieldState, patch);
  listeners.forEach(fn => fn(fieldState));
}

export function readField() {
  return { ...fieldState };
}

export function observeField(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
