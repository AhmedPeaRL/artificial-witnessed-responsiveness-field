let silenceTimer = null;

export function attachSilenceWitness(timeout = 5000) {
  reset();

  ["mousemove", "keydown", "click", "touchstart"].forEach(evt => {
    window.addEventListener(evt, reset);
  });

  function reset() {
    if (silenceTimer) clearTimeout(silenceTimer);
    silenceTimer = setTimeout(enterSilence, timeout);
  }

  function enterSilence() {
    document.body.classList.add("silence-state");
  }
}
