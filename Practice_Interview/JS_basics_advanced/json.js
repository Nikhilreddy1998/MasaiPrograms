//JSON means Java Script object notation 
//there should be no trailing commas
//you cant have directly methods(function inside object) in JSON
//key should be wrapped in double quotes


//normal object
let classroom=[
    {
        id:1,
        name:"Raju"
    },
    {
        id:2,
        name:"Bheem"
    }
]

//JSON

let classroom1=[
    {
        "id":1,
        "name":"Raju"
    },
    {
        "id":2,
        "name":"Bheem"
    }
]
//converting data into JSON and viceversa
let classroom3=[
    {
        id:1,
        name:"Nikhil"
    },
    {
        id:2,
        name:"Sanjay"
    }
]

let test =JSON.stringify(classroom3)
console.log(test)//JSON data

let readTest=JSON.parse(test)
console.log(readTest)//readable format

//example
const arr=[1,2,undefined,4,function(){}]
const result=JSON.stringify(arr)
console.log(result)