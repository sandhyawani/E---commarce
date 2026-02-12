import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection failed", error);
  }
}
