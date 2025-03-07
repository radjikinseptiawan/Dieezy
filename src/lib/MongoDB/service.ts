import { MongoClient } from "mongodb";

let client:MongoClient | null = null
export async function connectToDB(){
    if(!client){
        client  = new MongoClient(process.env.MONGODB_URI as string)
        console.log(client)
        await client.connect()
    }
    return client.db("test");
}


