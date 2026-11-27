import mongoose from "mongoose";

export async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected succesfully");
    }catch(err){
        console.log(err);
    }
}
