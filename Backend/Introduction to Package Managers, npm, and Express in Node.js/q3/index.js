const express =require('express')
const app =express()
const info=require('./read')
app.get('/test',(req,res)=>{
    res.send("Test route is working")
})
app.get('/readfile',(req,res)=>{
    info((err, data) => {
        if (err) {
            return res.status(500).send("Error reading file.");
        }
        res.send(`File content: ${data}`); // Send the data once it's available
    });
})

app.listen(3000,()=>{
    console.log("server started running")
})