function sum(num) {
    var sum = num.reduce(function (acc, curr) {
        return curr % 2 == 0 ? acc + curr : acc;
    }, 0);
    return sum;
}
console.log(sum([2, 5, 6, 29, 9]));
console.log(sum([11, 5, 9, 25]));
console.log(sum([10, 50, 9, 25]));
console.log(sum([1, 50, 9, 25]));
