import express from 'express';
import 'dotenv/config';
import conectarMongo from './conectmongo.js';
import { ObjectId } from 'mongodb';
import userRoute from './user-route.js';
import cineroute from './cineroute.js';
import salasrouter from './salasroute.js';

const app = express();
app.use(express.json());
app.use(express.static("./public"));

app.use('/api', userRoute);
app.use('/api/cine', cineroute);
app.use('/api/salas', salasrouter);
app.listen(
    {hostname:process.env.APP_HOSTNAME, port:process.env.APP_PORT},
    ()=>{
        console.log(`Server listening on ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`);
    }
)