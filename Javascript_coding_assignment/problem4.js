
/*Q4. Create a function that returns a promise* (10 Marks)

Write a function delayedMessage(msg, delay) that returns a promise which resolves with the message after delay milliseconds.

*/

function delayedMessage(msg, delay) {
   let result=new Promise((res,rej)=>{
    setTimeout(()=>{
        res(msg)

    },delay)
   })
   return result
}

delayedMessage("Hello, World!", 2000).then(console.log)
// Should print "Hello, World!" after 2 seconds

