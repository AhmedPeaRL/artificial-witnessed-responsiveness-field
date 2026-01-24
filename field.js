// field.js
export const Field = {
  t: 0,
  presence: { x: 0.5, y: 0.5 },
  disturbance: 0,
  breath: 0,
};

export function tick(dt = 0.002) {
  Field.t += dt;

  // تنفّس بطيء مستقل
  Field.breath = Math.sin(Field.t * 0.6) * 0.5 + 0.5;

  // تلاشي التشوّه
  Field.disturbance *= 0.985;
}

export function disturb(amount = 1) {
  Field.disturbance = Math.min(1, Field.disturbance + amount);
}

export function updatePresence(nx, ny) {
  Field.presence.x = nx;
  Field.presence.y = ny;
}
