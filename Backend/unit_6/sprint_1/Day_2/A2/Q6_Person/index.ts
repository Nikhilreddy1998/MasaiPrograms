
class Person{
    walk():void{
        console.log("Person is walking...")
    }
}

interface Coder{
    code():void;
}

class Developer extends Person implements Coder{
    code():void{
        console.log("Developer is Coding...")
    }

    walk():void{
        console.log("Developer is walking...")
    }
}

const D1 = new Developer()
D1.code()
D1.walk()

new Person().walk()
