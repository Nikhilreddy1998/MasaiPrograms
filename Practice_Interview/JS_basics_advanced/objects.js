// let obj ={
//     firstName:"Dholu",
//     lastName:"of Dholakpur",
//     phone:"9898989898",
//     subject:"Science",
//     Hobby:"Cricket"
// }
// //Accesing in object
// //1.Dot Notation
// console.log(obj.subject)
// console.log(obj.phone)
// //2.Square Notation
// console.log(obj["Hobby"])// Note here it should be in string format
// console.log(obj["Phone"])
// //To delete or To update
// delete obj.Hobby
// // or 
// delete obj["Hobby"]
// // while updating use square notation
// for(let keys in obj){
//     console.log(keys)// prints key
//     console.log(obj[keys])// prints key values
// }
// mapping with objects
// let arr=["a","b","c","d","e"]
// let obj={}
// for(let i=0;i<arr.length;i++){
//     let key=i+1
//     let keyValue=arr[i]
//     obj[key]=keyValue
// }
//console.log(obj)
// frequency with objects
let array=["a","a","b","b","c","d","d","d"]
let object={}
for(let i=0;i<array.length;i++){
    if(object[array[i]]){
    object[array[i]]++
    }
    else{
        object[array[i]]=1
    }
}
console.log(object)