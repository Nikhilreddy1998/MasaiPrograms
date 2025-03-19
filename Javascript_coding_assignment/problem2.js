/*
### **Q2. Filter out odd numbers using ****.filter()** (10 Marks)

Given an array of numbers, return a new array that only contains even numbers.
*/

function filtereven(arr)
{
    let newarr=arr.filter((ele)=>{
        if(ele%2==0)
            return ele
    })
    return newarr
}
let arr=[1,2,3,4,5,6,7,8,9,10]
console.log(filtereven(arr))

