export const isAdmin= (req,res, next)=>{
    try{    
        const user= req.user;
        if (user.role !=='admin') return res.status(403).json({msg: "this endpoint is just for admin users"})
        else next();
    }catch(error){
        next(error)
    }
}
