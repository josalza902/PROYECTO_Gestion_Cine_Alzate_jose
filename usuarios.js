import express from 'express';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import conectarMongo from './conectmongo.js';
import { usuariodatos } from './validaciones.js';
import { requireAdmin } from './auth.js';

const usuariosroute = express.Router();
const users = () => conectarMongo().then((db) => db.collection('usersnoadmin'));

usuariosroute.use(requireAdmin);

usuariosroute.post('/register', usuariodatos, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const result = await (await users()).insertOne(req.body);
  return res.status(201).json({ id: result.insertedId });
});

usuariosroute.get('/find', async (req, res) => {
  return res.json(await (await users()).find({}).toArray());
});

usuariosroute.put('/update/:id', usuariodatos, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'El identificador no es válido.' });

  const result = await (await users()).updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  if (result.matchedCount === 0) return res.status(404).json({ message: 'No se encontró el usuario.' });
  return res.json({ message: 'Usuario actualizado.' });
});

usuariosroute.delete('/borrar/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'El identificador no es válido.' });
  const result = await (await users()).deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).json({ message: 'No se encontró el usuario.' });
  return res.json({ message: 'Usuario eliminado.' });
});

usuariosroute.post('/anadirpuntos', async (req, res) => {
  const points = Number(req.body.puntos);
  if (!req.body.identificacion || !Number.isInteger(points) || points < 1) {
    return res.status(400).json({ message: 'Envía una identificación y una cantidad de puntos positiva.' });
  }

  const result = await (await users()).updateOne(
    { identificacion: req.body.identificacion },
    { $inc: { puntos: points } }
  );
  if (result.matchedCount === 0) return res.status(404).json({ message: 'No se encontró el usuario.' });
  return res.json({ message: 'Puntos añadidos.' });
});

usuariosroute.get('/historial', async (req, res) => {
  return res.json(await (await users()).find({}).toArray());
});

export default usuariosroute;
