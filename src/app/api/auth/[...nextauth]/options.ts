import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
                }
            }
        })
    ],

    // callbacks: {
    //     async jwt({ token, user }: { token: any, user: any }) {
    //         if(user) {
    //             token._id = user._id?.toString()
    //             token.isVerified = user.isVerified
    //             token.isAcceptingMessages = user.isAcceptingMessages
    //             token.username = user.username
    //         }
    //         return token
    //     },
    //     async session({ session, token }: { session: any, token: any }) {
    //         if(token) {
    //             session.user._id = token._id
    //             session.user.isVerified = token.isVerified
    //             session.user.isAcceptingMessages = token.isAcceptingMessages
    //             session.user.username = token.username
    //         }
    //         return session
    //     }
    // },

    callbacks: {
        async jwt({ token, account }) {
        if (account && account.provider === "google") {
            token.refreshToken = account.refresh_token;
            console.log("Google refresh token:", account.refresh_token);
        }
        return token;
        }
    },

    pages: {
        signIn: "/",
    },

    secret: process.env.NEXTAUTH_SECRET
}