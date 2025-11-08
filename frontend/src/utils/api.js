import axios from 'axios'

const API= axios.create({
    baseURL : "https://summerizer-app.vercel.app/api"
})


//add interceptors

API.interceptors.request.use((config)=>{
    const token =localStorage.getItem("token")
    if(token) config.headers.Authorization = `Bearer ${token}`
    return  config
})


///apis

export const signup = (data)=>API.post("/auth/signup",data)

export const login = (data) =>API.post ("/auth/login",data)

export const createArticle =(data) => API.post("/article/create",data)
export const getArticle = () =>API.get("/article/");
export const deleteArticle=(id)=>API.delete(`/article/${id}`)


export const summarizeText=(data)=>API.post("summarizer/summarize",data)
export const getSummaries=()=>API.get("summarizer/history") 