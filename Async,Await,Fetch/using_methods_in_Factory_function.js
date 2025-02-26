function createCar(make,model,year){
    return { 
                make:make,
                model:model,
                 year:year,
                 describeCar:function(){
                 console.log(`This car is a ${this.year} ${this.make} `)
                 }
    }
}
    
    let  car1=createCar("Toyata","Camry",2022)
    car1.describeCar()