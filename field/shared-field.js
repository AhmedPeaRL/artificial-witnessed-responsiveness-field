const fieldState = {
  presence: { x: 0.5, y: 0.5 },
  motionEnergy: 0,
  silence: false,
  strain: 0,
  disturbance: 0,
  time: 0
};

const observers = [];

export function observeField(fn) {
  observers.push(fn);
}

export function writeField(partial) {
  Object.assign(fieldState, partial);
  observers.forEach(fn => fn(fieldState));
}

export function readField() {
  return fieldState;
}
