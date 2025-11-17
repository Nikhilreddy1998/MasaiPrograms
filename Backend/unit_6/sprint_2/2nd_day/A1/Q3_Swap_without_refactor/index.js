// Given Code :
var Petrol = /** @class */ (function () {
    function Petrol() {
    }
    Petrol.prototype.start = function () {
        console.log("Petrol engine started");
    };
    return Petrol;
}());
var Diesel = /** @class */ (function () {
    function Diesel() {
    }
    Diesel.prototype.start = function () {
        console.log("Diesel engine started");
    };
    return Diesel;
}());
var CNG = /** @class */ (function () {
    function CNG() {
    }
    CNG.prototype.start = function () {
        console.log("CNG engin started");
    };
    return CNG;
}());
var Car = /** @class */ (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.drive = function () {
        this.engine.start();
        console.log("Driving....");
    };
    return Car;
}());
var petrol = new Car(new Petrol());
var diesel = new Car(new Diesel());
var cng = new Car(new CNG());
petrol.drive();
diesel.drive();
cng.drive();
