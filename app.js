import 'dotenv/config';
import express from 'express';
import bcrypt from 'bcryptjs';
import conectarMongo from './conectmongo.js';
import userRoute from './user-route.js';
import cineroute from './cineroute.js';
import salasrouter from './salasroute.js';
import usuariosroute from './usuarios.js';

const app = express();
const hostname = process.env.APP_HOSTNAME || '127.0.0.1';
const port = Number(process.env.APP_PORT || 3000);

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET debe tener al menos 32 caracteres. Revisa tu archivo .env.');
}
if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 12) {
  throw new Error('Configura ADMIN_USERNAME y una ADMIN_PASSWORD de al menos 12 caracteres.');
}

app.use(express.json({ limit: '1mb' }));
app.use(express.static('./public'));

app.use('/api', userRoute);
app.use('/api/cine', cineroute);
app.use('/api/salas', salasrouter);
app.use('/api/usuarios', usuariosroute);

app.use((error, request, response, next) => {
  console.error(error.message);
  response.status(error.status || 500).json({ message: 'No fue posible completar la solicitud.' });
});

async function startServer() {
  const db = await conectarMongo();
  const adminUsername = process.env.ADMIN_USERNAME.trim().toLowerCase();
  const admin = await db.collection('usuarios').findOne({ role: 'admin' });
  if (!admin) {
    await db.collection('usuarios').insertOne({
      username: adminUsername,
      nombre: 'Administrador',
      edad: 0,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12),
      role: 'admin'
    });
  }
  app.listen(port, hostname, () => {
    console.log(`API disponible en http://${hostname}:${port}`);
  });
}

startServer().catch((error) => {
  console.error(`No se pudo iniciar la API: ${error.message}`);
  process.exitCode = 1;
});
