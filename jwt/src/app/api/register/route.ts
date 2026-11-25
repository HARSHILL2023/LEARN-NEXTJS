import usercheckSchema from "@/lib/validation/auth";
import userSchema from "@/lib/model/user";
import { connectDB } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request:Request) {
    try {
        const body = await request.json();

        
        const res = usercheckSchema.safeParse(body);

        if (!res.success) {
            return Response.json({
                message: "Validation failed",
                error: res.error.issues[0]
            }, { status: 400 });
        }

        const { email, name, password } = res.data;

     
        await connectDB();

     
        const check = await userSchema.findOne({ email });

        if (check) {
            return Response.json({
                message: "User with this email already exists"
            }, { status: 409 });
        }

    
        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = await userSchema.create({
            name,
            email,
            password: hashpassword
        });

        return Response.json({
            message: "New user created successfully",
            user: {
                name: newUser.name,
                email: newUser.email
            }
        }, { status: 201 });

    } catch (err) {
        console.log(err);

        return Response.json({
            message: "Internal server error"
        }, { status: 500 });
    }
}