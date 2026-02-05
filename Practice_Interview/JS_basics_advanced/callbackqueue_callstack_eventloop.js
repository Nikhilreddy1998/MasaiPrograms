//event loop works untill call stack is empty and
//call back queue is not empty.


console.log("one")
function greet(){
    console.log("hello world")
}
setTimeout(()=>{
greet()
},5000)
greet()
console.log("two")
setTimeout(()=>{
console.log("asynccode")
},3000)
console.log("the end")