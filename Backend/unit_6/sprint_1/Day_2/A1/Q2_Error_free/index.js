// Question : 
// function add(a, b) {
//   return a + b;
// }
// let result = add(10, "5"); 
// console.log(result);  
// Solution : 
function add(a, b) {
    var num1 = typeof a == 'string' ? parseFloat(a) : a;
    var num2 = typeof b == 'string' ? parseFloat(b) : b;
    return num1 + num2;
}
var result = add(10, 5); // Correct: Both arguments are numbers
console.log(result); // Output: 15
var invalidResult = add(10, "5"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
console.log(invalidResult);
