// silence/silence.js
export function enforceSilence() {
  Object.freeze(localStorage);
  Object.freeze(sessionStorage);
  console.log = () => {};
}
