import { MongoClient } from "mongodb";
import { NextResponse } from "next/server"

const client = new MongoClient("mongodb+srv://radjikins21:sB6AgU3fqnQ6kCRo@cluster0.bjvov.mongodb.net/")
       
export async function GET(){
    try{
        await client.connect();
        const db = client.db("test")
        const collection = db.collection("users")
        const data = await collection.find().toArray()
        return NextResponse.json({data : data})    
    }catch(error){
        return NextResponse.json({message : "Error fetching data", error})
    }finally{
        await client.close()
    }
}