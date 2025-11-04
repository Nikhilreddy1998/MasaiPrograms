const authMiddleware=(req,res,next)=>{
    let token = req.headers.authorization.split(" ")[1]
    if(token){
        console.log("passed through authmiddle ware")
    }else{
        res.status(400).json({message:"unauthorized"})
    }
}

module.exports=authMiddleware