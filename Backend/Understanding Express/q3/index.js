const fs=require('fs')
const express=require('express')
const app=express()
app.use(express.json())

app.get('/read',(req,res)=>{
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let products=data.products
    res.json({msg:"list of products",products})
})

app.post('/create',(req,res)=>{
    let newproduct=req.body
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let products=data.products
    let id=products[products.length-1].id+1
    newproduct={...newproduct,id}
    products.push(newproduct)
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.json({msg:"product added"})
})

app.put('/update-product/:id',(req,res)=>{
    let id=req.params.id
    let updatedproduct=req.body
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let products=data.products
    let index=products.findIndex((product)=>product.id==id)
    if(index==-1){
        res.json({msg:"product not found"})
    }
    else{
        let updatedProducts=products.map((el,i)=>{
            if(el.id==id){
                return {...el,...updatedproduct}
            }
            else{
                return el
            }
        })
    data.products=updatedProducts
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.json({msg:'course-updated'})
    }

})

app.delete('/delete-product/:id',(req,res)=>{
    let id=req.params.id
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let products=data.products
    let index=products.findIndex((product)=>product.id==id)
    if(index==-1){
        res.json({msg:"product not found"})
    }
    else{
        let updatedProducts=products.filter((el,i)=>{
          return el.id!=id
        })
    data.products=updatedProducts
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.json({msg:'course-deleted'})
    }

})
app.listen(3000,()=>{
  console.log("server running")
})