import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

if(!process.env.MONGO_URL){
    console.error("No db ")
}

async function connectDB(){
    try{
 await mongoose.connect(process.env.MONGO_URL)
    console.log("Database connected")
    }catch(error){
        console.error("no database connected")
        process.exit(1)
    }
   
}

export default connectDB;