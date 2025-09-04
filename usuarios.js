import express from 'express';
import conectarMongo from './conectmongo.js';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { usuariodatos } from './validaciones.js';

const usuariosroute = express.Router();
usuariosroute.post('/register',usuariodatos,async(req,res)=>{
    const capture = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const db = await conectarMongo();
    const result = await db.collection("usersnoadmin").insertOne({...capture});
    res.send(result);
});
usuariosroute.get ('/find', async(req, res)=>{      
    const db = await conectarMongo();
    const result = await db.collection("usersnoadmin").find({}).toArray();
    res.send(result)
});
usuariosroute.put('/update/:id',usuariodatos,async(req,res)=>{
    const db = await conectarMongo();
    const result = await db.collection("usersnoadmin").updateOne({_id:ObjectId.createFromHexString(req.params.id)},{$set:req.body});
    res.send(result);
});
usuariosroute.delete('/borrar/:id',async(req,res)=>{
    const db = await conectarMongo();
    const result = await db.collection("usersnoadmin").deleteOne({_id:ObjectId.createFromHexString(req.params.id)})
    if(result.deletedCount === 0){
        return res.status(404).send({message:"No se ha encontrado el usuario"})
    }
    res.send(result)
})
usuariosroute.post('/anadirpuntos',async(req,res)=>{
    if(!req.body.identificacion || !req.body.puntos){
        return res.status(400).send({message:"debe enviar identificacion y puntos"})
    }
    const db = await conectarMongo();
    const result = await db.collection("usersnoadmin").updateOne(
        { identificacion: req.body.identificacion },
        { $inc: { puntos: req.body.puntos } }
    );
    res.send(result);
})
usuariosroute.get('/historial',async(req,res)=>{
    const db = await conectarMongo();
    const result = await db.collection("usersnoadmin").find({}).toArray();
    res.send(result);
})
export default usuariosroute;