import jwt from 'jsonwebtoken'
import User from '../models/usermodel.js';

export const protect=async (req, res, next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(!token) return res.status(401).json({message:"no token provided"})
    
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
         req.user = await User.findById(decoded.id).select("-password"); // ✅ attaches full user object
        next();
    }catch(error){
        res.status(401).json({messsage:"invalid token"})
    }
}