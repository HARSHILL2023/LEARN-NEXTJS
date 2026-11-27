import RegisterModel from "@/lib/model/registermodel";
import loginCheck from "@/lib/validate/login";
import { connectDB } from "@/lib/db/db";
import bcrypt from "bcrypt";
import { signToken,verifytoken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function POST(request:Request){
    const body=await request.json();

    await connectDB();
    const res=loginCheck.safeParse(body);

    if(!res.success){
        return Response.json({
            "message":"validation failed"
        },{status:400})
    }

    const {email,password}=res.data;

    const findUser=await RegisterModel.findOne({email});

    if(!findUser){
        return Response.json({
            "message":"user not found"
        },{status:404})
    }

    const checkpass=await bcrypt.compare(password,findUser.password);

    if(!checkpass){
        return Response.json({
            "message":"pasword or email is wrong"
        },{status:401});
    }

    const token=await signToken(findUser._id);

    const cookieStore=await cookies();

    cookieStore.set("token",token,{httpOnly:true});

    return Response.json({mssg:"login succesfully"})
}