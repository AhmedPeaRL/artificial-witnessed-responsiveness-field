let lastPulse = Date.now();

export function involuntaryPulse(disturb) {
  const now = Date.now();

  // فاصل غير منتظم – لا يمكن توقعه
  if (now - lastPulse < 4000 + Math.random() * 6000) return;

  lastPulse = now;

  const silentToken = Math.random().toString(36).slice(2, 7);

  disturb({
    source: "field",
    weight: 0.15,
    trace: silentToken,
    involuntary: true
  });
}
