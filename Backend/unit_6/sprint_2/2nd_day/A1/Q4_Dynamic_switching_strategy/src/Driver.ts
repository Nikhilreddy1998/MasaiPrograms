import { IVehicle } from "./IVehicle";


export class Driver{
    private vehicle:IVehicle
    constructor(vehicle:IVehicle){
        this.vehicle = vehicle
    }

    drive(){
        this.vehicle.start()
        console.log("Driving...")
    }

    setVehicle(vehicle:IVehicle){
        this.vehicle = vehicle
    }
}