// Write a TypeScript class Person with the following features:
// The class should have name (string) and age (number) as properties.
// It should have a method greet() that returns a greeting message including the person's name and age.
// Additionally, implement a static method isAdult() that checks if the person is an adult (age ≥ 18).
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.greet = function () {
        return "Hello! my name is ".concat(this.name, " & I am ").concat(this.age, " years old");
    };
    Person.isAdult = function (age) {
        return age >= 18;
    };
    return Person;
}());
var P1 = new Person("Yash", 22);
console.log(P1.greet());
console.log(Person.isAdult(P1.age));
var P2 = new Person("Demo", 17);
console.log(P2.greet());
console.log(Person.isAdult(P2.age));
