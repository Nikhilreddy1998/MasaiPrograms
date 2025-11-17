


class Engine{
    start():void{
        console.log("Engine started")
    }
}

class Car{
    private engine:Engine
    constructor(engine:Engine){
        this.engine = engine
    }

    drive():void{
        this.engine.start()
        console.log("Car is driving")
    }
}

const car = new Car(new Engine())
car.drive()