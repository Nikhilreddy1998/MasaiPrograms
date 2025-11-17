var Bike = /** @class */ (function () {
    function Bike(brand) {
        this.brand = brand;
    }
    Bike.prototype.getDetails = function () {
        return "Bike: ".concat(this.brand);
    };
    return Bike;
}());
var Car = /** @class */ (function () {
    function Car(brand) {
        this.brand = brand;
    }
    Car.prototype.getDetails = function () {
        return "Car: ".concat(this.brand);
    };
    return Car;
}());
var VehicleFactory = /** @class */ (function () {
    function VehicleFactory() {
    }
    VehicleFactory.createVehicle = function (type, brand) {
        if (type == "Bike")
            return new Bike(brand);
        else if (type == "Car")
            return new Car(brand);
        else
            throw new Error("Invalid Vehicle type");
    };
    return VehicleFactory;
}());
var myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
console.log(myBike.getDetails());
var myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myCar.getDetails());
