
const dataCheck = (req,res,next) =>{
    const {title,description,user,priority} = req.body
    if(!title || !description || !user || !priority){
       return res.status(400).json({error:"Data insufficient, please provide all required fields"})
    }
    next()
}

module.exports = {dataCheck}