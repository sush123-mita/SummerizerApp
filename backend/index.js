import express from "express";
import cors from 'cors';
import morgan from 'morgan'
import dotenv from 'dotenv';
import helmet from 'helmet';
import connectDB from './config/connectDB.js'
import authRoutes from './routes/authRoutes.js'
import articleRoute from './routes/articleRoute.js'
import summarizeRoutes from "./routes/summarizeRoutes.js"

dotenv.config()

const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(helmet())

const PORT=3000;
app.get('/helmet',(req,res)=>{
    res.status(200).json({
       success:true
    })
})
app.get('/',(req,res)=>{
    res.status(200).json({
        sucess:true
    })
})

app.use("/api/auth",authRoutes)
app.use('/api/summarizer',summarizeRoutes)
app.use('/api/article',articleRoute)

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server started at port ${PORT} `)
    })
})
