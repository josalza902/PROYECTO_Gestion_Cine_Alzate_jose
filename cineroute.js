import express from 'express';
import conectarMongo from './conectmongo.js';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { cinedatos } from './validaciones.js';
const cineroute = express.Router();
cineroute.post('/register',cinedatos,async(req,res)=>{
    const capture = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const db = await conectarMongo();
    const result = await db.collection("cines").insertOne({...capture});
    res.send(result);
});
cineroute.get ('/find', async(req, res)=>{      
    const db = await conectarMongo();
    const result = await db.collection("cines").find({}).toArray();
    res.send(result)
})
cineroute.put('/update/:id',cinedatos,async(req,res)=>{     
    const db = await conectarMongo();
    const result = await db.collection("cines").updateOne({_id:ObjectId.createFromHexString(req.params.id)},{$set:req.body});
    res.send(result)
})
cineroute.delete('/borrar/:id',async(req,res)=>{     
    const db = await conectarMongo();
    const result = await db.collection("cines").deleteOne({_id:ObjectId.createFromHexString(req.params.id)});
    if(result.deletedCount === 0){
        return res.status(404).send({message:"No se ha encontrado el cine"})
    }
    
    res.send(result)

})
export default cineroute;