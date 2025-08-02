const express = require ('express')

const ProductModel = require("../models/product.model")

const  ProductRouter = express.Router()

ProductRouter.get('/',async(req,res)=>{
    try{
        let products = await ProductModel.find({})
        res.status(200).json({msg:'productlist',products})
    }catch(err){
        res.status(500).json({msg:"Something went wrong",err})
    }
})


ProductRouter.post('/add-product',async(req,res)=>{
    let product=await ProductModel.create(req.body)
    res.status(200).json({msg:"product updated",product})
})

ProductRouter.patch('update-product/:productid', async(req,res)=>{
    const {productId}=req.params

    let product = await ProductModel.findBYId(productId)

    if(!product){
        res.status(404).json({msg:"Product not found"})
    }
    else{
        await ProductModel.findByIdandUpdate(productId,req.body)

        res.status(200).json({msg :"product updated"})
    }
})


ProductRouter.delete('delete-product/:productid', async(req,res)=>{
    const {productId}=req.params

    let product = await ProductModel.findBYId(productId)

    if(!product){
        res.status(404).json({msg:"Product not found"})
    }
    else{
        await ProductModel.findByIdandDelete(productId)

        res.status(200).json({msg :"product deleted"})
    }
})

module.exports = BookRouter