import express from 'express';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import conectarMongo from './conectmongo.js';
import { salasdatos } from './validaciones.js';
import { requireAdmin } from './auth.js';

const salasrouter = express.Router();
const salas = () => conectarMongo().then((db) => db.collection('salas'));

salasrouter.post('/register', requireAdmin, salasdatos, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const sala = {
    id: req.body.id,
    numerodesillas: Number(req.body.numerodesillas),
    cine: req.body.cine
  };
  const result = await (await salas()).insertOne(sala);
  return res.status(201).json({ message: 'Sala registrada.', id: result.insertedId });
});

salasrouter.get('/find', async (req, res) => {
  const result = await (await salas()).find({}).toArray();
  return res.json(result);
});

salasrouter.put('/update/:id', requireAdmin, salasdatos, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'El identificador de la sala no es válido.' });
  }

  const { id, numerodesillas, cine } = req.body;
  const result = await (await salas()).updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { id, numerodesillas: Number(numerodesillas), cine } }
  );
  if (result.matchedCount === 0) return res.status(404).json({ message: 'No se encontró la sala.' });
  return res.json({ message: 'Sala actualizada.' });
});

salasrouter.delete('/borrar/:id', requireAdmin, async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'El identificador de la sala no es válido.' });
  }

  const result = await (await salas()).deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).json({ message: 'No se encontró la sala.' });
  return res.json({ message: 'Sala eliminada.' });
});

export default salasrouter;
