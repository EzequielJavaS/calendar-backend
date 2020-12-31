//Ponemos el tipado a la res para que noa ayude con la escritura.
//El next es un callback que se ejecuta si el middleware se ha ejecutado correctamente para pasar al siguiemte check o finalmente al controller
const {response} = require( 'express' );
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
     //Manejo de errores
     const errors = validationResult ( req );
     if ( !errors.isEmpty()){
         return res.status(400).json({
             ok: false,
             errors: errors.mapped(),
             msg: 'Debe de introducir un email correcto o una contraseña de + 5 dígitos'
         });
     }
     //Si hay un error se ejecutará en return del if y nunca se ejecutará el next()
     next();
}
module.exports = { validarCampos }