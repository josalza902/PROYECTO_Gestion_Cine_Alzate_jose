import express from 'express';
import { ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { rateLimit } from 'express-rate-limit';
import conectarMongo from './conectmongo.js';
import { loginValidator, userentrada } from './validaciones.js';
import { requireAdmin } from './auth.js';

const userRoute = express.Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false
});
const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false
});

userRoute.post('/register', registrationLimiter, userentrada, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const db = await conectarMongo();
  const existing = await db.collection('usuarios').findOne({ username: req.body.username });
  if (existing) return res.status(409).json({ message: 'Ese correo ya está registrado.' });

  const password = await bcrypt.hash(req.body.password, 12);
  const user = {
    username: req.body.username.trim().toLowerCase(),
    nombre: req.body.nombre.trim(),
    edad: Number(req.body.edad),
    password,
    role: 'user'
  };
  const result = await db.collection('usuarios').insertOne(user);
  return res.status(201).json({ id: result.insertedId, username: user.username });
});

userRoute.post('/login', loginLimiter, loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const db = await conectarMongo();
  const username = req.body.username.trim().toLowerCase();
  const user = await db.collection('usuarios').findOne({ username });
  const passwordMatches = user && await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatches) return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });

  const token = jwt.sign(
    { id: user._id.toString(), username: user.username, role: user.role || 'user' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return res.json({ message: 'Inicio de sesión correcto.', token });
});

userRoute.get('/find', requireAdmin, async (req, res) => {
  const db = await conectarMongo();
  const users = await db.collection('usuarios').find({}, { projection: { password: 0 } }).toArray();
  return res.json(users);
});

userRoute.put('/update/:id', requireAdmin, userentrada, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'El identificador no es válido.' });

  const db = await conectarMongo();
  const update = {
    username: req.body.username.trim().toLowerCase(),
    nombre: req.body.nombre.trim(),
    edad: Number(req.body.edad)
  };
  if (req.body.password) update.password = await bcrypt.hash(req.body.password, 12);
  const result = await db.collection('usuarios').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: update }
  );
  if (result.matchedCount === 0) return res.status(404).json({ message: 'No se encontró el usuario.' });
  return res.json({ message: 'Usuario actualizado.' });
});

userRoute.delete('/borrar/:id', requireAdmin, async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'El identificador no es válido.' });
  const db = await conectarMongo();
  const result = await db.collection('usuarios').deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).json({ message: 'No se encontró el usuario.' });
  return res.json({ message: 'Usuario eliminado.' });
});

export default userRoute;
