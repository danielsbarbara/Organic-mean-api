import { MongoClient } from "mongodb"
import dotenv from 'dotenv'
dotenv.config()

const DBname: string = process.env.DBNAME!
const collecName: string = process.env.DBCOLLECTION!
const url: string = process.env.DB_URL!
let client: any = undefined

console.log(DBname, collecName, url);
async function GetMongoClient() {
    try{
        if(!client){
            client = new MongoClient(url)
            await client.connect()
            console.log('⚡️ DB connected')
        }
    }catch(e){
        console.log(e)
    }

    return client
}

export async function GetCollection(dbName: string = DBname, collectionName: string = collecName) {
    const cli = await GetMongoClient()
    const db = await cli.db(dbName)
    return db.collection(collectionName)
}