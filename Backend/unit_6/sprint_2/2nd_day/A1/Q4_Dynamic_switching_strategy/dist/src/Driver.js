"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
class Driver {
    constructor(vehicle) {
        this.vehicle = vehicle;
    }
    drive() {
        this.vehicle.start();
        console.log("Driving...");
    }
    setVehicle(vehicle) {
        this.vehicle = vehicle;
    }
}
exports.Driver = Driver;
