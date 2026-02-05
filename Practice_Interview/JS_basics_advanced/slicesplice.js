//slice
//_________slice doesnt modifies the original array
//arr.slice(startIndex,endIndex) end index is explicit

let arr=["one","two","three","four"]
let narr=arr.slice(1,3)
console.log(narr)
console.log(arr)

//splice
//_____splice modifies the original array can deletes,insert or replace elements
//array.splice(startIndex, deleteCount, item1, item2, ...)
//array.splice(startIndex,deleteCount)

let arr1=["apple","banana","grapes"]
let narr1=arr1.splice(1,2,"mango","kiwi")

console.log(arr1)
console.log(narr1)
