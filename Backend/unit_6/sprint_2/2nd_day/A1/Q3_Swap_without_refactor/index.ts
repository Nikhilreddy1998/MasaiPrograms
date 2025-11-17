// Given Code :

// class PetrolEngine {
//   start(): void {
//     console.log("Petrol engine started");
//   }
// }

// class Car{
//   engine: PetrolEngine = new PetrolEngine();
//   drive(): void {
//     this.engine.start();
//     console.log("Driving car");
//   }
// }

// In the class Car we creating objet of class PertrolEngine directly(hardcoded) into the class Car, hence we are able to change with other type of Engines that why it is called as tight coupling. Every time you need hardcode the EngineType and change it manually
// To inject other types of Engine, we need to implent interface Engine then its able to accept other types of Engine and called as loose coupling. 


interface Engine{
    start():void;
}

class Petrol implements Engine{
    start(): void {
        console.log("Petrol engine started")
    }
}

class Diesel implements Engine{
    start(): void {
        console.log("Diesel engine started")
    }
}

class CNG implements Engine{
    start(): void {
        console.log("CNG engin started")
    }
}

class Car{
    private engine:Engine 
    constructor(engine:Engine){
        this.engine = engine
    }
    drive():void{
        this.engine.start()
        console.log("Driving....")
    }
}

const petrol = new Car(new Petrol())
const diesel = new Car(new Diesel())
const cng = new Car(new CNG())

petrol.drive()
diesel.drive()
cng.drive()