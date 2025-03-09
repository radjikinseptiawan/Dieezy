import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB/service";
import bcrypt from "bcrypt"

export async function POST(request : NextRequest){
   const {username,email,password} = await request.json()
    const db = await connectToDB()
    const users = db.collection("users")
    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = {
        username,
        email,
        password : hashedPassword,
        date : new Date().toLocaleString()
    }

    const result = await users.insertOne(newUser)
    return NextResponse.json({message : `${result} created account!`})
}