//promoises introduced because setTimeout can only schedule tasks with
//fixed delays it doesnt iherently know when the async task actually
//finishes so we use promises

//frontend--API--backend

// API call the conversation between FE and BE

//Promises 
//Fullfilled or rejected or inprocess/pending

//each promise transitions automatically from pending to fullfilled
//or rehected capturing the final outcome once known


let DB=[
  {
  name:"Raju",
  id:1
  },
  {
    name:"Dholu",
    id:2
  }
]

let APIcall=new Promise((response,reject)=>{
  let server=true
  setTimeout(()=>{
    if(server){
      response(DB)
    }
    else
    {
      reject("404 error")
    }
  },3000)
})

APIcall
.then((res)=>{
  res.forEach((ele,ind)=>{
    console.log(ele.name)
  })
})
.catch((err)=>{
  console.log(err)
})