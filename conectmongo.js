import { MongoClient } from 'mongodb';

let client;
let connectionPromise;

export default async function conectarMongo() {
  const uri = process.env.URL_MONGODB;
  const databaseName = process.env.DB_NAME;

  if (!uri || !databaseName) {
    throw new Error('Configura URL_MONGODB y DB_NAME en el archivo .env.');
  }

  if (!connectionPromise) {
    client = new MongoClient(uri);
    connectionPromise = client.connect().catch((error) => {
      client = undefined;
      connectionPromise = undefined;
      throw error;
    });
  }

  await connectionPromise;
  return client.db(databaseName);
}
