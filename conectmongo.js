import { MongoClient } from "mongodb";
import 'dotenv/config';


export default async function conectarMongo(){
    const client = new MongoClient(process.env.URL_MONGODB);
    await client.connect();
    const josedb = client.db(process.env.DB_NAME);
    return josedb

} 
conectarMongo().then(db=>console.log("Conectado a la base de datos", db.databaseName))
.catch(err=>console.log("Error al conectar a la base de datos", err));