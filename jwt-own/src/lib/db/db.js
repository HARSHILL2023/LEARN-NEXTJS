import mongoose from "mongoose";

export async function connectDB(){
    try{
        mongoose.connect("mongodb://localhost:27017/jwt-own");
        console.log("database connected succesfully");
    }catch(err){
        console.log(err);
    }
}