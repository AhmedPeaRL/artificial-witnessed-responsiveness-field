// field/shared-field.js

const fieldState = {
  presence: null,
  motionEnergy: 0,
  silence: false,
  strain: 0,
};

export function getFieldState() {
  return fieldState;
}
