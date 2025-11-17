
// Q1: Basic Inheritance
class Duck{
    swim():void{
        console.log("I know swimming")
    }
}
let D1 = new Duck()
D1.swim()

class MallardDuck extends Duck {}

const mallardDuck1 = new MallardDuck()
mallardDuck1.swim()

// Q2: Method Overriding Basics

class Bird{
    fly():void{
        console.log("I can fly")
    }
}

class Penguin extends Bird{
    fly():void{
        console.log("I cannot fly")
    }
}

const bird1 = new Bird()
const bird2 = new Penguin()
bird1.fly()
bird2.fly()

// Q3: Interface Implementation

interface IDuck{
    swim():void;
    fly():void;
    sound():void;
}

class ToyDuck implements IDuck{
    swim():void{
        console.log("Can float on water")
    }
    fly():void{
        console.log("Cannot fly")
    }
    sound(): void {
        console.log("Cannot sound")
    }
}

const toyDuck = new ToyDuck()
toyDuck.fly()
toyDuck.sound()
toyDuck.swim()