import { SignJWT,jwtVerify } from "jose";

const singkey=new TextEncoder().encode(process.env.JWT_SECRET)


export async function signToken(userID:string){
    const token =await new  SignJWT({userID})
    .setProtectedHeader({alg:"HS256"})
    .setExpirationTime("1d")
    .sign(singkey)

    return token;
}

export async function verifytoken(token:string){
    const {payload}=await jwtVerify(token,singkey);

    return payload;

}