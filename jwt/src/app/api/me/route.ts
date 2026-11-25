import { cookies } from "next/headers";
import { verifytoken } from "../../../lib/jwt";

export async function GET() {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
        return Response.json({
            message: "Not authenticated"
        }, { status: 401 });
    }

    try {
        const payload = await verifytoken(token);

        return Response.json({
            message: "Authenticated successfully",
            userId: payload.userID
        });

    } catch (error) {
        return Response.json({
            message: "Invalid or expired token"
        }, { status: 401 });
    }
}