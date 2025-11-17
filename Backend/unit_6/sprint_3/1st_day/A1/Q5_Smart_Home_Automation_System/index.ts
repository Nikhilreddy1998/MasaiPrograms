

interface LightState {
  turnOn(): void;
  turnOff(): void;
  detectMotion(): void;
  adjustBrightness(isDaytime: boolean): void;
}

class SmartLight {
  private offState: LightState;
  private onState: LightState;
  private motionState: LightState;
  private brightnessState: LightState;
  private currentState: LightState;

  constructor() {
    this.offState = new OffState(this);
    this.onState = new OnState(this);
    this.motionState = new MotionDetectionState(this);
    this.brightnessState = new BrightnessAdjustmentState(this);
    this.currentState = this.offState;
  }

  setState(state: LightState) {
    this.currentState = state;
  }

  getOffState() { return this.offState; }
  getOnState() { return this.onState; }
  getMotionState() { return this.motionState; }
  getBrightnessState() { return this.brightnessState; }

  turnOn() { this.currentState.turnOn(); }
  turnOff() { this.currentState.turnOff(); }
  detectMotion() { this.currentState.detectMotion(); }
  adjustBrightness(isDaytime: boolean) { this.currentState.adjustBrightness(isDaytime); }
}

class OffState implements LightState {
  constructor(private light: SmartLight) {}
  turnOn() {
    console.log("Light turned on manually.");
    this.light.setState(this.light.getOnState());
  }
  turnOff() {
    console.log("Light is already off.");
  }
  detectMotion() {
    console.log("Motion detected. Turning on automatically.");
    this.light.setState(this.light.getMotionState());
  }
  adjustBrightness() {
    console.log("Light is off. Cannot adjust brightness.");
  }
}

class OnState implements LightState {
  constructor(private light: SmartLight) {}
  turnOn() {
    console.log("Light is already on.");
  }
  turnOff() {
    console.log("Light turned off.");
    this.light.setState(this.light.getOffState());
  }
  detectMotion() {
    console.log("Light is already on.");
  }
  adjustBrightness(isDaytime: boolean) {
    console.log("Adjusting brightness...");
    this.light.setState(this.light.getBrightnessState());
    this.light.adjustBrightness(isDaytime);
  }
}

class MotionDetectionState implements LightState {
  constructor(private light: SmartLight) {}
  turnOn() {
    console.log("Light is already on due to motion.");
  }
  turnOff() {
    console.log("Light turned off.");
    this.light.setState(this.light.getOffState());
  }
  detectMotion() {
    console.log("Motion already detected.");
  }
  adjustBrightness(isDaytime: boolean) {
    console.log("Adjusting brightness based on motion...");
    this.light.setState(this.light.getBrightnessState());
    this.light.adjustBrightness(isDaytime);
  }
}

class BrightnessAdjustmentState implements LightState {
  constructor(private light: SmartLight) {}
  turnOn() {
    console.log("Light is already on with adjusted brightness.");
  }
  turnOff() {
    console.log("Light turned off.");
    this.light.setState(this.light.getOffState());
  }
  detectMotion() {
    console.log("Motion detected while adjusting brightness.");
  }
  adjustBrightness(isDaytime: boolean) {
    if (isDaytime) {
      console.log("Daytime detected. Brightness reduced.");
    } else {
      console.log("Nighttime detected. Brightness increased.");
    }
    this.light.setState(this.light.getOnState());
  }
}

const light = new SmartLight();
light.turnOn();
light.adjustBrightness(true);
light.detectMotion();
light.adjustBrightness(false);
light.turnOff();
