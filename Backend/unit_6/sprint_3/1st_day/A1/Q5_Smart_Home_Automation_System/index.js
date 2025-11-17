var SmartLight = /** @class */ (function () {
    function SmartLight() {
        this.offState = new OffState(this);
        this.onState = new OnState(this);
        this.motionState = new MotionDetectionState(this);
        this.brightnessState = new BrightnessAdjustmentState(this);
        this.currentState = this.offState;
    }
    SmartLight.prototype.setState = function (state) {
        this.currentState = state;
    };
    SmartLight.prototype.getOffState = function () { return this.offState; };
    SmartLight.prototype.getOnState = function () { return this.onState; };
    SmartLight.prototype.getMotionState = function () { return this.motionState; };
    SmartLight.prototype.getBrightnessState = function () { return this.brightnessState; };
    SmartLight.prototype.turnOn = function () { this.currentState.turnOn(); };
    SmartLight.prototype.turnOff = function () { this.currentState.turnOff(); };
    SmartLight.prototype.detectMotion = function () { this.currentState.detectMotion(); };
    SmartLight.prototype.adjustBrightness = function (isDaytime) { this.currentState.adjustBrightness(isDaytime); };
    return SmartLight;
}());
var OffState = /** @class */ (function () {
    function OffState(light) {
        this.light = light;
    }
    OffState.prototype.turnOn = function () {
        console.log("Light turned on manually.");
        this.light.setState(this.light.getOnState());
    };
    OffState.prototype.turnOff = function () {
        console.log("Light is already off.");
    };
    OffState.prototype.detectMotion = function () {
        console.log("Motion detected. Turning on automatically.");
        this.light.setState(this.light.getMotionState());
    };
    OffState.prototype.adjustBrightness = function () {
        console.log("Light is off. Cannot adjust brightness.");
    };
    return OffState;
}());
var OnState = /** @class */ (function () {
    function OnState(light) {
        this.light = light;
    }
    OnState.prototype.turnOn = function () {
        console.log("Light is already on.");
    };
    OnState.prototype.turnOff = function () {
        console.log("Light turned off.");
        this.light.setState(this.light.getOffState());
    };
    OnState.prototype.detectMotion = function () {
        console.log("Light is already on.");
    };
    OnState.prototype.adjustBrightness = function (isDaytime) {
        console.log("Adjusting brightness...");
        this.light.setState(this.light.getBrightnessState());
        this.light.adjustBrightness(isDaytime);
    };
    return OnState;
}());
var MotionDetectionState = /** @class */ (function () {
    function MotionDetectionState(light) {
        this.light = light;
    }
    MotionDetectionState.prototype.turnOn = function () {
        console.log("Light is already on due to motion.");
    };
    MotionDetectionState.prototype.turnOff = function () {
        console.log("Light turned off.");
        this.light.setState(this.light.getOffState());
    };
    MotionDetectionState.prototype.detectMotion = function () {
        console.log("Motion already detected.");
    };
    MotionDetectionState.prototype.adjustBrightness = function (isDaytime) {
        console.log("Adjusting brightness based on motion...");
        this.light.setState(this.light.getBrightnessState());
        this.light.adjustBrightness(isDaytime);
    };
    return MotionDetectionState;
}());
var BrightnessAdjustmentState = /** @class */ (function () {
    function BrightnessAdjustmentState(light) {
        this.light = light;
    }
    BrightnessAdjustmentState.prototype.turnOn = function () {
        console.log("Light is already on with adjusted brightness.");
    };
    BrightnessAdjustmentState.prototype.turnOff = function () {
        console.log("Light turned off.");
        this.light.setState(this.light.getOffState());
    };
    BrightnessAdjustmentState.prototype.detectMotion = function () {
        console.log("Motion detected while adjusting brightness.");
    };
    BrightnessAdjustmentState.prototype.adjustBrightness = function (isDaytime) {
        if (isDaytime) {
            console.log("Daytime detected. Brightness reduced.");
        }
        else {
            console.log("Nighttime detected. Brightness increased.");
        }
        this.light.setState(this.light.getOnState());
    };
    return BrightnessAdjustmentState;
}());
var light = new SmartLight();
light.turnOn();
light.adjustBrightness(true);
light.detectMotion();
light.adjustBrightness(false);
light.turnOff();
