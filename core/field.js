// core/field.js
export class RhythmicField {
  constructor() {
    this.state = [];
  }

  witness(disturbance) {
    this.state.push(disturbance);
    setTimeout(() => {
      this.state.shift();
    }, disturbance.decay);
  }
}
