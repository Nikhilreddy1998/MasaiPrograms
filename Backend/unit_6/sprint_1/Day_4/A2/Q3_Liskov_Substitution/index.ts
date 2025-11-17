
// Objects of a superclass should be able to be replace with   objects of subclass without affecting the program


interface Flyable{
    fly():void;
}

class Bird{
    move():void{
        console.log("Bird is moving")
    }
}

class Parrot extends Bird implements Flyable{
    fly():void{
        console.log("Parrot is Flying")
    }
}

// Ostrich cant fly so I change superclass with subclass,
//  now ostrich will not able to access to fly only run & move 
// will work 
class Ostrich extends Bird {
    run():void{
        console.log("Ostrich is running fast")
    }
}

const parrot = new Parrot()
parrot.fly()

const ostrich = new Ostrich()
ostrich.move()
ostrich.run()
// ostrich.fly() // Gives Compile-error