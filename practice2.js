function CarFactory (color, title) {
        this.color = color;
        this.title = title;
       
    }
    CarFactory.prototype.horn=function() {
        return `${this.title}, horns`
    }

let car1 = new CarFactory("Black", "Benz");
//console.log(car1.horn())
let car2=Object.getPrototypeOf(car1)
console.log(car2)
let car3={
    a:1
}
Object.setPrototypeOf(car2,car3)
