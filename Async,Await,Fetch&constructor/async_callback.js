function timer(duration,oncomplete)
{
setTimeout(()=>{
oncomplete(`Timer of ${duration} ms finished`)
},1000)
}
timer(1000,(functionparameter)=>{
console.log(functionparameter)
})
//for duration you are passing 1st argument of timer that is 1000 and
//  for oncomplete you are passing the entire 2nd argument of timer that is  (functionparameter)=>{.....} 
// therefore oncomplete is a callback function.

/*let oncomplete= function (functionparameter){
    console.log(functionparameter)
  }
  oncomplete("Timer of ....")
*/