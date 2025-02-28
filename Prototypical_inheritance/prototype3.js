function Car(make, model, year, isAvailable = true) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isAvailable = isAvailable;
  }
  
  function Customer(name) {
    this.name = name;
    this.rentedCars = [];
  }
  
  Customer.prototype.rentCar = function(car) {
    if (car.isAvailable) {
      car.isAvailable = false;
      this.rentedCars.push(car);
      console.log(`${this.name} rented ${car.make} ${car.model}`);
    } else {
      console.log(`${car.make} ${car.model} is already rented.`);
    }
  };
  
  function PremiumCustomer(name, discountRate) {
    Customer.call(this, name);
    this.discountRate = discountRate;
  }
  
  PremiumCustomer.prototype = Object.create(Customer.prototype);
  PremiumCustomer.prototype.constructor = PremiumCustomer;
  
  function calculateRentalPrice(car, days, isPremium, discountRate) {
    let basePrice = 50;
    let carTypeRate = 1;
    if (car.model.toLowerCase().includes('suv')) {
      carTypeRate = 1.5;
    } else if (car.model.toLowerCase().includes('sedan')) {
      carTypeRate = 1.2;
    }
    let totalPrice = basePrice * carTypeRate * days;
    if (isPremium) {
      totalPrice *= (1 - discountRate / 100);
    }
    return totalPrice;
  }
  
  Customer.prototype.returnCar = function(car) {
    car.isAvailable = true;
    this.rentedCars = this.rentedCars.filter(c => c !== car);
    setTimeout(() => {
      console.log(`${this.name} returned ${car.make} ${car.model}`);
    }, 2000);
  };
  
  function Maintenance(car, delay) {
    setTimeout(() => {
      car.isAvailable = true;
      console.log(`${car.make} ${car.model} maintenance complete`);
    }, delay);
  }
  
  let car1 = new Car('Toyota', 'Corolla', 2020);
  let car2 = new Car('Honda', 'Civic', 2021);
  let car3 = new Car('Ford', 'SUV', 2019);
  let car4 = new Car('Tesla', 'Sedan', 2022);
  
  let customer1 = new Customer('Alice');
  let premiumCustomer1 = new PremiumCustomer('Bob', 10);
  
  customer1.rentCar(car1);
  premiumCustomer1.rentCar(car3);
  customer1.rentCar(car2);
  premiumCustomer1.rentCar(car4);
  
  console.log(`Rental price for ${car1.make} ${car1.model} for 3 days: $${calculateRentalPrice(car1, 3, false, 0)}`);
  console.log(`Rental price for ${car3.make} ${car3.model} for 5 days (premium): $${calculateRentalPrice(car3, 5, true, premiumCustomer1.discountRate)}`);
  
  customer1.returnCar(car1);
  premiumCustomer1.returnCar(car3);
  
  Maintenance(car2, 3000);