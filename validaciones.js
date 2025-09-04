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
    body('codigo').isString().isLength({max:3}).withMessage('El codigo debe tener max 3 numeros'),
    body('direccion').isString().isLength({min:9}).withMessage('El telefono debe ser una cadena de texto'),
    body('ciudad').isLength({min:2}).withMessage('La ciudad debe ser una cadena de texto'),
    body('salas').isInt({min:1}).withMessage('El numero de salas debe ser un numero entero positivo'),
]
export const updatecineValidator = cinedatos.filter((valor, indice)=>indice<=4)

export const salasdatos = [
    body('id').isString().isLength({max:4}).withMessage('El id debe tener max 4 caracteres'),
    body('numerodesillas').isInt({min:1}).withMessage('El numero de sillas debe ser un numero entero positivo'),
    body('cine').isString().isLength({max:3}).withMessage('el codigo debe tener max 3 numeros')
]
export const updatesalasValidator = salasdatos.filter((valor, indice)=>indice<=2)

export const peliculadatos = [ 
    body('codigo').isInt({min:3}).withMessage('El codigo debe ser un numero entero positivo y tener al menos 3 digitos'),
    body('titulo').isString().isLength({min:2}).withMessage('El titulo debe ser una cadena de texto'),
    body('sinopsis').isString().isLength({min:10}).withMessage('La sinopsis debe ser una cadena de texto y tener al menos 10 caracteres'),
    body('reparto').isString().isLength({min:5}).withMessage('El reparto debe ser una cadena de texto y tener al menos 5 caracteres'),
    body('clasificacion').isString().isLength({min:1}).withMessage('La clasificacion debe ser una cadena de texto'),
    body('idioma').isString().isLength({min:2}).withMessage('El idioma debe ser una cadena de texto'),
    body('director').isString().isLength({min:2}).withMessage('El director debe ser una cadena de texto'),
    body('duracion').isInt({min:1}).withMessage('La duracion debe ser un numero entero positivo'),
    body('genero').isString().isLength({min:2}).withMessage('El genero debe ser una cadena de texto'),
    body('fechaestreno').isDate().withMessage('La fecha de estreno debe ser una fecha valida'),
    body('trailer').isString().isLength({min:5}).withMessage('El trailer debe ser una cadena de texto y tener al menos 5 caracteres'),
    body('imagen').isString().isLength({min:5}).withMessage('La imagen debe ser una cadena de texto y tener al menos 5 caracteres')
]

export const updatepeliculaValidator = peliculadatos.filter((valor, indice)=>indice >=1 && indice <=11)

export const usuariodatos =[
    body('identificacion').isInt().isLength({max:15}).withMessage('debe tener maximo 15 numeros'),
    body('nombre').isString().isLength({min:2}).withMessage('El nombre debe ser una cadena de texto'),
    body('apellidos').isString().isLength({min:2}).withMessage('Los apellidos deben ser una cadena de texto'),
    body('correo').isEmail().withMessage('El correo debe ser un email valido'),
    body('telefono').isInt().isLength({min:9}).withMessage('el telefono debe ser un integer y tener minimo 9 numeros'),

]

export const updateusuarioValidator = usuariodatos.filter((valor, indice)=>indice>=1 && indice <=4)


