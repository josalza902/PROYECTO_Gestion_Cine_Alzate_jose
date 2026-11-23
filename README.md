# API de gestión de cines

API de práctica construida con Node.js, Express y MongoDB para administrar cines, salas y usuarios. Incluye validación de solicitudes, contraseñas con hash, JWT y permisos administrativos para las operaciones de escritura.

## Requisitos y configuración

- Node.js 18 o superior
- MongoDB local o remoto

1. Instala dependencias con `npm install`.
2. Copia `.env.example` como `.env` y configura `URL_MONGODB`, `DB_NAME`, `JWT_SECRET` (mínimo 32 caracteres), `ADMIN_USERNAME` y `ADMIN_PASSWORD` (mínimo 12 caracteres).
3. Ejecuta `npm run dev` durante el desarrollo o `npm start`.

Al iniciar, la API crea una cuenta administrativa si aún no existe una. Las cuentas creadas en `/api/register` tienen rol de usuario y no reciben permisos administrativos. Por defecto el servidor escucha en `127.0.0.1:3000`.

## Rutas principales

Todas las rutas empiezan por `/api`.

| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| POST | `/register` | Registra una cuenta de usuario | Público |
| POST | `/login` | Inicia sesión y devuelve un JWT | Público |
| GET | `/cine/find` | Lista cines | Público |
| POST/PUT/DELETE | `/cine/*` | Crea, actualiza o elimina cines | Administrador |
| GET | `/salas/find` | Lista salas | Público |
| POST/PUT/DELETE | `/salas/*` | Crea, actualiza o elimina salas | Administrador |
| GET/PUT/DELETE | `/find`, `/update/:id`, `/borrar/:id` | Consulta o administra cuentas | Administrador |

En rutas protegidas envía `Authorization: Bearer <token>`. Obtén el token desde `/api/login` usando la cuenta administrativa configurada.

## Alcance

Es una demostración académica, no una API auditada ni preparada para producción. Usa datos ficticios. `.env` está excluido de Git; no publiques credenciales ni datos personales.
