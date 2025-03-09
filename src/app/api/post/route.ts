import { connectToDB } from "@/lib/MongoDB/service";
import { NextRequest, NextResponse } from "next/server";
import { decryptData, encryptData } from "./utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req : NextRequest){
    try{
    const session = await getServerSession(authOptions)

        if(!session){
            return NextResponse.json({message : "Unauthorized"},{status : 401})
        }
    const body = await req.json()
    if(!body || !body.post){
        return NextResponse.json({message : "Invalid request body"},{status : 400})
    }
    const {post,media = null} = body
    const db = await connectToDB()
   
    const messages = db.collection("messages")
    const postDate =  new Date().toISOString() 
   
    const postContaint = encryptData(post)
    const newMessage = {
        username : session.user?.username as string,
        post : postContaint,
        date :postDate,
        media  
    }
     await messages.insertOne(newMessage)
    return NextResponse.json({message : "success add data"},{status:200}) 
    }catch(error){
    console.log(error)
    }
}

export async function GET() {
    const db = await connectToDB()
    const message = db.collection("messages")
    const showMessage = await message.find().toArray()
    const decryptMessage = showMessage.map((msg)=>({
        ...msg,
        post : decryptData(msg.post)
    }))
    return NextResponse.json({message : "Success fetchin data",data : decryptMessage})
}