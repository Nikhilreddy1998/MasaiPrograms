// Create a Student class with:
// name (string)
// age (number)
// rollNo (number)
// A constructor to initialize all properties
// A method displayDetails() that logs Student: {name}, Age: {age}, Roll No: {rollNo}
// Create two instances of Student and call their displayDetails() method.
var Student = /** @class */ (function () {
    function Student(name, age, rollNo) {
        this.name = name;
        this.age = age;
        this.rollNo = rollNo;
    }
    Student.prototype.displayDetails = function () {
        console.log("Student: ".concat(this.name, ", Age: ").concat(this.age, ", Roll No: ").concat(this.rollNo));
    };
    return Student;
}());
var S1 = new Student("Yash", 23, 100);
S1.displayDetails();
var S2 = new Student("Demo", 19, 101);
S2.displayDetails();
