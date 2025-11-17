

interface Vehicle{
    getDetails():void;
}

class Bike implements Vehicle{
    constructor(private brand:string){}
    getDetails(): string {
       return `Bike: ${this.brand}`
    }
}

class Car implements Vehicle{
    constructor(private brand:string){}
    getDetails(): string {
        return `Car: ${this.brand}`
    }
}

class VehicleFactory{
    static createVehicle(type:"Bike" | "Car",brand:string):Vehicle{
        if(type == "Bike") return new Bike(brand)
        else if(type =="Car") return new Car(brand)
        else throw new Error("Invalid Vehicle type")
    }

}

const myBike = VehicleFactory.createVehicle("Bike","Yamaha")
console.log(myBike.getDetails())

const myCar = VehicleFactory.createVehicle("Car","Toyota")
console.log(myCar.getDetails())