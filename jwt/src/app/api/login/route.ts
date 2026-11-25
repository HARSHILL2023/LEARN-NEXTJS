import loginSchema  from "../../../lib/validation/loginschema"
import UserModel from "../../../lib/model/user"
import bcrypt from "bcrypt"
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";




export async function POST(request: Request) {
    const body = await request.json();

    const res = await loginSchema.safeParse(body)

    if (!res.success) {
        return Response.json({
            message: "validation failed",
            error: res.error.issues[0]
        })
    };
    const { email, password } =  res.data;

    await connectDB();
    
    const finduser = await UserModel.findOne({ email });

    if (!finduser) {
        return Response.json({ message: "user not found" }, { status: 400 });
    }

    const checkpass = await bcrypt.compare(password, finduser.password)

    if (!checkpass) {
        return Response.json({
            message: "password is wrong"
        }, { status: 401 })
    }

    const token = await signToken(finduser._id);

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24
    })

    return Response.json({
    message: "Login successful"
});
}   