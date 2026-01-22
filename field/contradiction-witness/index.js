export function observeContradiction(fieldState) {
  const signals = [];

  if (fieldState.motion > 0.7 && fieldState.silence === true) {
    signals.push("motion/silence overlap");
  }

  if (fieldState.textPresence && fieldState.memory === false) {
    signals.push("expression without retention");
  }

  if (signals.length > 1) {
    fieldState.contradiction = true;
  }
}
