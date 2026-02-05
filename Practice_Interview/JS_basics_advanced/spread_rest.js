//spread opeartor spreads the content of array and object
let arr=[1,2,3]
let arr1=[...arr]
console.log(arr)
console.log([...arr,...arr1])

//similarly for objects
let person1={
name:"Nikhil",
age:"27"
}
let personaldetails={
    married:"Not married",
    presentYear:"2026"
}

let combined={...person1,...personaldetails}
console.log(combined)


//rest operator combines the given arguments into an array

function multi(factor,...nums){
    let res=factor
    for(let i=0;i<nums.length;i++){
       res=res*nums[i]
    }
    return res
}
console.log(multi(5,1,2,3,4,5))