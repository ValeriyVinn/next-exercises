import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in environment variables");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // У режимі розробки зберігаємо клієнт у глобальній змінній,
  // щоб не створювати новий інстанс при кожному hot reload
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // У production створюється один новий клієнт
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
