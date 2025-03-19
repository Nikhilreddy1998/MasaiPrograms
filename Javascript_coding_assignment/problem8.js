/*### *Q8. Implement a Factory Function* (10 Marks)

Create a factory function createCar that returns a new car object with brand and speed. Add a method accelerate() that increases speed.

js
function createCar(brand, speed) {
   // Your code here
}

const car = createCar("Toyota", 60);
car.accelerate(); // Speed increased to 70
*/
function createCar(brand,speed)
{
    let obj={}
    obj.brand=brand
    obj.speed=speed
    obj.accelerate=function(){
        obj.speed=speed+10
        console.log("Speed increased to",obj.speed)
    }
    return obj

}
let car1=createCar("Toyata",60)
car1.accelerate()