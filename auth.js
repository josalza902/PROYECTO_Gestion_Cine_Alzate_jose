import jwt from 'jsonwebtoken';

export function requireToken(request, response, next) {
  const authorization = request.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({ message: 'Se requiere un token Bearer válido.' });
  }

  try {
    request.auth = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return response.status(401).json({ message: 'El token no es válido o ya venció.' });
  }
}

export function requireAdmin(request, response, next) {
  if (request.auth?.role !== 'admin') {
    return response.status(403).json({ message: 'Esta operación requiere una cuenta administrativa.' });
  }
  return next();
}
