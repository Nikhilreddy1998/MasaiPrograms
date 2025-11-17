import { BikeStrategy } from "./src/BikeStrategy";
import { CarStrategy } from "./src/CarStrategy";
import { Driver } from "./src/Driver";

const bike = new BikeStrategy()
const car = new CarStrategy()

const vehicle = new Driver(bike)
vehicle.drive()
vehicle.setVehicle(car)
vehicle.drive()