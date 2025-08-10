

const roleMiddleware = (roles=[]) =>{
    return (req,res,next)=>{
        try {
            if(!roles.includes(req.user.role)){
                return res.status(403).json({message:"Unauthorized role"})
            }
            next()
        } catch (error) {
            res.status(500).json({ err: "Something went wrong", error: error.message });
        }
    }
}
module.exports = roleMiddleware