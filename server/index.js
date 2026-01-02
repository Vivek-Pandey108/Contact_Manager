import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDB();

const app =express();
const PORT= process.env.PORT  || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/contacts",contactRoutes)

app.get("/",(req,res)=>{
    // console.log("welcome");
    res.send("Welcome to Backend Dear")
})



app.listen(3000,()=>{
    console.log(`Server Started at ${PORT}`);
})