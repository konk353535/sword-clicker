import { MongoClient } from "mongodb"
import { env } from "./validateEnv"

export const client = new MongoClient(env.MONGO_URI)
export const db = client.db(env.MONGO_DB)
export const usersCollection = db.collection("users")
export const fulfillmentCollection = db.collection("fulfillment")

export const connect = async (): Promise<boolean> => {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect()
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 })

        // do setup stuff
        const result = await db.listCollections({ name: "fulfillment" }).toArray()
        if (result.length === 0) {
            // create the collection
            const newCollection = await db.createCollection("fulfillment")
        }

        console.log("Pinged your deployment. You successfully connected to MongoDB!")
        return true
    } catch (err) {
        console.log("Error connecting to MongoDB", err)
        return false
    }
}
