let lastPulse = Date.now();

export function involuntaryPulse(disturbFn) {
  const now = Date.now();

  // فجوة غير منتظمة – لا يمكن توقعها
  const gap = 3500 + Math.random() * 7000;
  if (now - lastPulse < gap) return;

  lastPulse = now;

  // تشوّه خفيف جدًا بلا سبب إدخالي
  const weight = 0.08 + Math.random() * 0.12;

  disturbFn(weight);
}
