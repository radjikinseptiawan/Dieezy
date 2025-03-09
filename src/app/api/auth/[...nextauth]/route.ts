/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { Session } from "next-auth";
import bcrypt from "bcrypt";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { connectToDB } from "@/lib/MongoDB/service";

export const authOptions = {
    session : {
        strategy : "jwt" as const
    },
    secret : process.env.NEXTAUTH_SECRET,
    providers : [
        CredentialsProvider({ 
        name : "Credentials",
        credentials : {
            username : {label : "username", type : "text"},
            password : {label : "password", type : "password"}
        },
        async authorize(credentials){
            try{
                const db = await connectToDB()
                const userCollection = db.collection("users")
    
                const user = await userCollection.findOne({username : credentials?.username})
    
                if(!user){
                    throw new Error("User not found")
                }
    
                const isValidPassword = await bcrypt.compare(credentials?.password || "", user.password)
                if(!isValidPassword){
                    throw new Error("Password is Invalid!")
                }
                return {id : user._id.toString(),username : user.username}
            }catch(error){
                console.error(error)
                return null
            }
        }          
    })],
    callbacks : {
        async jwt({token,user} : {token : JWT; user?:any}){
            if(user){
                token.id = user.id
                token.username = user.username
            }
            return token
        },
        async session({session,token} : {session : Session,token : JWT}){
            if(token){
                (session.user as any).id = token.id as string
                (session.user as any).username = token.username as string
            }
            return session
        }
    },
    pages : {
        signIn:"/login"
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}