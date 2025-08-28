import e from 'express';
import {body} from 'express-validator';

export const  adminentrada =[
    
    body('password').isLength({min:6}).withMessage('La password debe tener al menos 6 caracteres'),
    body('username').isEmail().withMessage('El email debe ser un email valido'),
]
export const updateadminValidator = adminentrada.filter((valor, indice)=>indice<=1)
export const loginAdminValidator = [
    body('username').isEmail().exists().withMessage('debe ser un email valido y obligadorio'),
    body('password').exists().withMessage('Debe enviar la contraseña')
]
export const userentrada =[
    body('username').isEmail().withMessage('El email debe ser un email valido'),
    body('nombre').isString().isLength({min:2}).withMessage('El nombre debe ser una cadena de texto'),
    body('edad').isInt({min:0}).withMessage('La edad debe ser un numero entero positivo'),
    body('password').isLength({min:6}).withMessage('La password debe tener al menos 6 caracteres')
]
export const updateuserValidator = userentrada.filter((valor, indice)=>indice<=3)
export const loginValidator = [
    body('username').isEmail().exists().withMessage('debe ser un email valido y obligadorio'),
    body('password').exists().withMessage('Debe enviar la contraseña')
]
export const cinedatos =[
    body('nombre').isString().isLength({min:2}).withMessage('El nombre debe ser una cadena de texto'),
    body('codigo').isString().isLength({min:5}).withMessage('La direccion debe ser una cadena de texto'),
    body('direccion').isString().isLength({min:9}).withMessage('El telefono debe ser una cadena de texto'),
    body('ciudad').isInt({min:1}).withMessage('El numero de salas debe ser un numero entero positivo'),
]
