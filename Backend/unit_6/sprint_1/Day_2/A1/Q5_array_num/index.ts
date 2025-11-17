

function sum(num:number[]):number{
    let sum = num.reduce((acc:number,curr:number):number=>{
       return curr%2==0?acc+curr:acc
    },0)
   return sum
}

console.log(sum([2,5,6,29,9]))
console.log(sum([11,5,9,25]))
console.log(sum([10,50,9,25]))
console.log(sum([1,50,9,25]))