
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authh = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            }
        })
    ]
});

export const { handlers, auth, signIn, signOut } = authh;
