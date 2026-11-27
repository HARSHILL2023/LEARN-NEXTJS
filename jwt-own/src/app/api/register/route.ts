import checkregister from "@/lib/validate/register";
import registerSchema from "@/lib/model/registermodel";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db/db"; 

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = checkregister.safeParse(body);
    if (!res.success) {
      return Response.json(
        { message: "Validation failed", errors: res.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();

    const { name, email, password } = res.data;

    
    const findUser = await registerSchema.findOne({ email });
    if (findUser) {
      return Response.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    await registerSchema.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
