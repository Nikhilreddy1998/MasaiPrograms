import { IVehicle } from "./IVehicle";


export class CarStrategy implements IVehicle{
    start(): void {
        console.log("Car is starting")
    }
}