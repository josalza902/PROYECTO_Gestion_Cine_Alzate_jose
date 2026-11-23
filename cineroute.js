import express from 'express';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import conectarMongo from './conectmongo.js';
import { cinedatos } from './validaciones.js';
import { requireAdmin } from './auth.js';

const cineroute = express.Router();
const cines = () => conectarMongo().then((db) => db.collection('cines'));

cineroute.post('/register', requireAdmin, cinedatos, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const result = await (await cines()).insertOne(req.body);
  return res.status(201).json({ id: result.insertedId });
});

cineroute.get('/find', async (req, res) => {
  const result = await (await cines()).find({}).toArray();
  return res.json(result);
});

cineroute.put('/update/:id', requireAdmin, cinedatos, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'El identificador del cine no es válido.' });
  }

  const result = await (await cines()).updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  if (result.matchedCount === 0) return res.status(404).json({ message: 'No se encontró el cine.' });
  return res.json({ message: 'Cine actualizado.' });
});

cineroute.delete('/borrar/:id', requireAdmin, async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'El identificador del cine no es válido.' });
  }

  const result = await (await cines()).deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).json({ message: 'No se encontró el cine.' });
  return res.json({ message: 'Cine eliminado.' });
});

export default cineroute;
