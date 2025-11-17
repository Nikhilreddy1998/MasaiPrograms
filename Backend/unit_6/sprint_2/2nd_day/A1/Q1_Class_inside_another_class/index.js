var Engine = /** @class */ (function () {
    function Engine() {
    }
    Engine.prototype.start = function () {
        console.log("Engine started");
    };
    return Engine;
}());
var Car = /** @class */ (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.drive = function () {
        this.engine.start();
        console.log("Car is driving");
    };
    return Car;
}());
var car = new Car(new Engine());
car.drive();
