var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.start = function () {
        console.log('Car is starting');
    };
    return Car;
}());
var Bike = /** @class */ (function () {
    function Bike() {
    }
    Bike.prototype.start = function () {
        console.log("Bike is starting");
    };
    return Bike;
}());
var Driver = /** @class */ (function () {
    function Driver(type) {
        this.type = type;
    }
    Driver.prototype.drive = function () {
        this.type.start();
        console.log("Driving...");
    };
    return Driver;
}());
var car = new Driver(new Car());
car.drive();
var bike = new Driver(new Bike());
bike.drive();
