import mongoose from "mongoose";

export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database is connected")
    }catch(err){
        console.log("something went wrong");
        console.log(err);
    }
}