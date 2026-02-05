//forEach,map,filter,reduce
// difference between forEach and map is map returns an array
//but forEach doesnt return. For Each is used for mutation of array

//*** forEach and map
// map is used to modify the array
//filter is used to filter the wanted elements
var arr=[1,2,3,4,5]

arr.forEach((ele,ind,arr)=>{
    console.log(ele,ind)
})

let newArr=arr.map((ele,ind,arr)=>{
    if(ele%2==0){
        return ele*ele
    }
    else
    {
        return ele
    }
})
console.log(newArr)

//**filter
let arr1=[1,2,3,4,5,6]
let newarr1=arr1.filter((ele,ind,arr1)=>{
    if(ele%2==0) {
    return true
    }
})
console.log(newarr1)

//**reduce*/
var arr2=[1,2,3,4,5]
var sum=arr.reduce((acc,curr)=>{
    let newSum=acc+curr
    return newSum
},0)
zZconsole.log(sum)






