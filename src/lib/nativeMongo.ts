import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function connectDB() {
    if (!client.topology) await client.connect();
    return client.db("meuBanco"); // Substitua pelo nome real do seu banco
}
