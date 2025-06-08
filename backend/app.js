import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app=express();

app.set("port",(process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit: "50kb"}));
app.use(express.urlencoded({limit: "50kb", extended: true}));


// app.get("/",(req,res)=>{
//     return res.json({"intro":"hello World"});
// })

app.use("/api/v1/users",userRoutes);


const start=async()=>{

    const connectionDb=await mongoose.connect("mongodb+srv://hrishikeshsarma4444:Hrishi2004@cluster0.u60b0.mongodb.net/ecoTime")
        .then(()=>{
            console.log("MongoDb connected");
        })

    app.listen(app.get("port"),()=>{
        console.log("Listening on port 8000");
    })
}

start();
