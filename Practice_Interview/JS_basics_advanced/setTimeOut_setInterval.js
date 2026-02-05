//setTimeout(callbackfunction,delay)
// setTimeout(()=>{
//     console.log("Hello")
// },5000)

// //setInterval(callbackfunction,delay)
// setInterval(()=>{
// console.log("this will keep on running after 3 sec")
// },3000)

//timer
// function timer(){
//     let count=0
//     setInterval(()=>{
//     count++
//     console.log(count)
//     },1000)
// }
// timer()

//clearInterval 

// example want to stop timer at count=6

function timer(){
    let count=0
    let intId=setInterval(()=>{
      count++
      console.log(count)
      if(count==6){
      clearInterval(intId)
      console.log("Interval cleared")
      }
    },1000)
}

timer()



