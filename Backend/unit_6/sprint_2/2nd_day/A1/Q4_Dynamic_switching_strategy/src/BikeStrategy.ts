import { IVehicle } from "./IVehicle";


export class BikeStrategy implements IVehicle{
    start(): void {
        console.log("Bike is starting")
    }
}