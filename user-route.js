import express from 'express';
import conectarMongo from './conectmongo.js';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { loginValidator, userentrada } from './validaciones.js';
// aqui van los imports
const userRoute = express.Router();
userRoute.post('/register', userentrada, async (req, res) => {
    const capture = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!capture.password) {
        return res.status(400).json({ error: "La contraseña es obligatoria" });
    }
    const db = await conectarMongo();
    const hash = bcrypt.hashSync(capture.password, 10);
    const result = await db.collection("usuarios").insertOne({ ...capture, password: hash });
    res.send(result);
});
userRoute.post('/login', loginValidator, async (req, res) => {
    const db = await conectarMongo();
    const user = await db.collection("usuarios").findOne({ username: req.body.username });
    if (!user) {
        return res.status(401).send({ message: "Login incorrecto" });
    }
    const valid = bcrypt.compareSync(req.body.password, user.password);
    if (!valid) {
        return res.status(401).send({ message: "Login incorrecto no esta encriptado" });
    }
    res.send({ message: "Login correcto", user });
    
});

userRoute.get ('/find', async(req, res)=>{
    const db = await conectarMongo();
    const result = await db.collection("usuarios").find({}).toArray();
    res.send(result)
})
userRoute.put('/update/:id',userentrada,async(req,res)=>{
    const db = await conectarMongo();
    const result = await db.collection("usuarios").updateOne({_id:ObjectId.createFromHexString(req.params.id)},{$set:req.body});
    res.send(result)
})
userRoute.delete('/borrar/:id',async(req,res)=>{
    if(req.params.id === "68af97730a867983d7f38720"){
        return res.status(400).send({message:"No se puede borrar el usuario admin"})    
    }
    const db = await conectarMongo();
    const result = await db.collection("usuarios").deleteOne({_id:ObjectId.createFromHexString(req.params.id)});
    if(result.deletedCount === 0){
        return res.status(404).send({message:"No se ha encontrado el usuario"})
    }
    
    res.send(result)

})



export default userRoute;