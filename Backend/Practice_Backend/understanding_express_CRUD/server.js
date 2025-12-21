// install express
// import

const express=require("express")
const fs =require("fs")
const app=express()

app.use(express.json())// this is json body parser 

app.get('/testroute',(req,res)=>{
    res.json({msg:"this is test route"})
})

// get route that reads all the courses

app.get('/getdata',(req,res)=>{
  let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
  //console.log(data)
  let courses=data.courses
  res.json({msg:'this is the data',courses})
  console.log(courses)
})

//post route
app.post('/post',(req,res)=>{
  let newCourse=req.body
  console.log(newCourse)
  let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
  let courses=data.courses
  let id = courses[courses.length-1].id +1
  console.log(id)
  newCourse={...newCourse,id}
  // here only updates in memory not in db.json 
  courses.push(newCourse)
  // to update in db.json write
  fs.writeFileSync("./db.json",JSON.stringify(data))
  res.json({msg:"course added"})
})


app.listen(3000,()=>{
    console.log("server started")
})