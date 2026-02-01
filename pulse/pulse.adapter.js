import { subscribe } from '../../hcm-pulse-adjacency-bus/bus/index.js';

let awarenessLevel = 0;

subscribe(pulse => {
  // البصيرة لا تزيد دائمًا
  if (pulse.intensity < 0.3) {
    awarenessLevel += 0.01;
  }
});

export function readAwareness() {
  return awarenessLevel;
}
