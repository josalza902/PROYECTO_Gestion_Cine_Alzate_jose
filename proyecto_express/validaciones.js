import {body} from 'express-validator';

export const  adminentrada =[
    body('nombre').isString().isLength({min:2}).withMessage('El nombre debe ser una cadena de texto'),
    body('contrasena').isLength({min:6}).withMessage('La password debe tener al menos 6 caracteres'),
    body('email').isEmail().withMessage('El email debe ser un email valido'),
]

export const updateUserValidator = adminentrada.filter((valor, indice)=>indice<=2)
export const loginValidator = [
    body('username').isEmail().exists().withMessage('debe ser un email valido y obligadorio'),
    body('password').exists().withMessage('Debe enviar la contraseña')
]