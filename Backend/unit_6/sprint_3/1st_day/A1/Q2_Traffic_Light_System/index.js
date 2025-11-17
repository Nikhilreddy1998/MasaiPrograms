var LightState;
(function (LightState) {
    LightState[LightState["Red"] = 0] = "Red";
    LightState[LightState["Green"] = 1] = "Green";
    LightState[LightState["Yellow"] = 2] = "Yellow";
})(LightState || (LightState = {}));
var TrafficLight = /** @class */ (function () {
    function TrafficLight() {
        this.state = LightState.Red;
    }
    TrafficLight.prototype.change = function () {
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
    };
    return TrafficLight;
}());
var light = new TrafficLight();
light.change();
light.change();
light.change();
light.change();
