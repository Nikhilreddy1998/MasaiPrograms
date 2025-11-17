

interface IVehicle{
    start():void;
}

class Car implements IVehicle{
    start():void{
        console.log('Car is starting')
    }
}

class Bike implements IVehicle{
    start():void{
        console.log("Bike is starting")
    }
}

class Driver{
    private type:IVehicle
    constructor(type:IVehicle){
        this.type = type
    }

    drive():void{
        this.type.start()
        console.log("Driving...")
    }
}

const car = new Driver(new Car())
car.drive()
const bike = new Driver(new Bike())
bike.drive()