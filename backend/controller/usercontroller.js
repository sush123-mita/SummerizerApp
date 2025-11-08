import jwt from'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from "../models/usermodel.js"


export const signup =async(req,res)=>{
    try{
        const {username,email, password}=req.body
        const exisitinguser=await User.findOne({email})
        if(exisitinguser){
            return res.status(400).json({
                message:"User already exist"
            })
        }
        const newuser=new User({username,email,password})
        await newuser.save()
        res.status(201).json({message:"User created successfully"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const exisitinguser=await User.findOne({email})
        if(!exisitinguser)
            return res.status(404).json({message:"User not found"})
        if(!exisitinguser|| !password){
return res.status(401).json({message:"invalid user"})
        }
        const isvalid=await bcrypt.compare(password,exisitinguser.password)
        if(!isvalid)
            return res.status(401).json({message:"invalid user"})
        
        const token=jwt.sign({id:exisitinguser._id},process.env.JWT_SECRET,{
            expiresIn:"1h",
        })

        res.json({token})
    }catch(error){
        return res.status(500).json({message:"login failed"})
    }
}


