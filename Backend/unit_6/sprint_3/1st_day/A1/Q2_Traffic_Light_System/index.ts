

enum LightState {
  Red,
  Green,
  Yellow
}

class TrafficLight {
  private state: LightState;

  constructor() {
    this.state = LightState.Red;
  }

  change() {
    if (this.state === LightState.Red) {
      console.log("Red – Stop");
      this.state = LightState.Green;
    } 
    else if (this.state === LightState.Green) {
      console.log("Green – Go");
      this.state = LightState.Yellow;
    } 
    else if (this.state === LightState.Yellow) {
      console.log("Yellow – Slow down");
      this.state = LightState.Red;
    }
  }
}

const light = new TrafficLight();
light.change();
light.change();
light.change();
light.change();
