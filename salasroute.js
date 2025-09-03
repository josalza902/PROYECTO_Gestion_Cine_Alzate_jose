import express from 'express';
import conectarMongo from './conectmongo.js';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { cinedatos } from './validaciones.js';
const salasrouter = express.Router();
salasrouter.post('/register',cinedatos,async(req,res)=>{
    const capture = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        await conectarMongo();
        const newSala = {
            nombre: capture.nombre,
            codigo: capture.codigo,
            direccion: capture.direccion,
            ciudad: capture.ciudad,
            salas: capture.salas
        };
        const result = await db.collection('salas').insertOne(newSala);
        res.status(201).json({message:'Sala registrada',id:result.insertedId});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Error al registrar sala'});
    }
});
salasrouter.get ('/find', async(req, res)=>{
    try {
        await conectarMongo();
        const salas = await db.collection('salas').find().toArray();
        res.status(200).json(salas);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Error al obtener salas'});
    }
});
salasrouter.put('/update/:id',cinedatos,async(req,res)=>{
    const { id } = req.params;
    const capture = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        await conectarMongo();
        const result = await db.collection('salas').updateOne({_id:ObjectId(id)},{$set:capture});
        if(result.modifiedCount === 0){
            return res.status(404).json({message:'Sala no encontrada'});
        }
        res.status(200).json({message:'Sala actualizada'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Error al actualizar sala'});
    }
});
salasrouter.delete('/borrar/:id',async(req,res)=>{
    const { id } = req.params;
    try {
        await conectarMongo();
        const result = await db.collection('salas').deleteOne({_id:ObjectId(id)});
        if(result.deletedCount === 0){
            return res.status(404).json({message:'Sala no encontrada'});
        }
        res.status(200).json({message:'Sala eliminada'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Error al eliminar sala'});
    }
});

export default salasrouter;