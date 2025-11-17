var Car = /** @class */ (function () {
    function Car(brand, engine, color, sunroof, automaticTransmission) {
        this.brand = brand;
        this.engine = engine;
        this.color = color;
        this.sunroof = sunroof;
        this.automaticTransmission = automaticTransmission;
    }
    Car.prototype.describe = function () {
        return "".concat(this.brand, " with ").concat(this.engine, " engine, color: ").concat(this.color, ", ") +
            "Sunroof: ".concat(this.sunroof ? 'Yes' : 'No', ", Automatic Transmission: ").concat(this.automaticTransmission ? 'Yes' : 'No');
    };
    return Car;
}());
var CarBuilder = /** @class */ (function () {
    function CarBuilder() {
        this.sunroof = false;
        this.automaticTransmission = false;
    }
    CarBuilder.prototype.setBrand = function (brand) { this.brand = brand; return this; };
    CarBuilder.prototype.setEngine = function (engine) { this.engine = engine; return this; };
    CarBuilder.prototype.setColor = function (color) { this.color = color; return this; };
    CarBuilder.prototype.addSunroof = function () { this.sunroof = true; return this; };
    CarBuilder.prototype.addAutomaticTransmission = function () { this.automaticTransmission = true; return this; };
    CarBuilder.prototype.build = function () {
        if (!this.brand || !this.engine || !this.color) {
            throw new Error('Brand, engine, and color are required.');
        }
        return new Car(this.brand, this.engine, this.color, this.sunroof, this.automaticTransmission);
    };
    return CarBuilder;
}());
function main() {
    var teslaModelS = new CarBuilder()
        .setBrand("Tesla Model S")
        .setEngine("Electric")
        .setColor("Black")
        .addSunroof()
        .addAutomaticTransmission()
        .build();
    console.log(teslaModelS.describe());
}
main();
