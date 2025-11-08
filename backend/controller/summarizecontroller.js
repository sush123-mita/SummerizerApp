import {GoogleGenerativeAI} from "@google/generative-ai"
import Summary from "../models/Summary.js"


const genAI=new GoogleGenerativeAI(process.env.GOOGLE_APIKEY)

export const summarizeText = async(req,res)=>{
    try{
        const {text}=req.body;

        if(!text) {
            return res.status(400).json({message:"No text provide"})
        }

        const model = genAI.getGenerativeModel({model:"gemini-2.5-flash"})

        const prompt = `summarize this text in 5-6 concise line :${text}`

        const result =await model.generateContent(prompt);
        const summary = result.response.text();


        //save krenge DB me 

        const save=await Summary.create({
            userId: req.user.id,
            OriginalText: text,
            summaryText: summary,

        })

        res.status(200).json({sucess:true, summary})
    }catch(error){
        console.error("Gemini summarizer Error: ", error.message)
        res.status(500).json({success:false , message:"Failed"})
    }
}


export const getSummaries = async (req,res)=>{
    try{
        if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
        const summaries = await Summary.find({userId:req.user.id}).sort({createdAt: -1})
        res.json({success: true, summaries});
    }catch(error){
        res.status(500).json({message: "Error fetching summaries"})
    }
}