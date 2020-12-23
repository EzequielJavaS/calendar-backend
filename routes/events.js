/*
    Rutas de Eventos
    host +/api/events
*/

const {Router} = require('express');
const router = Router();
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const {validarJWT} = require('../middleware/validar-jwt');//Hay que implementarlo en la ruta de validar token 
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { isDate } = require('../helpers/isDate')


//Crearemos todo el CRUD: Create, Read, Update, Delete.
//Todas las peticiones tienen quen pasar por la validación de JWT
router.use( validarJWT );

//Petición Obtener eventos
router.get('/',getEventos)

//Crear un nuevo evento
router.post('/',
    [
        check('title',  'El título es obligatorio').not().isEmpty(),
        check('start',  'Fecha de inicio es obligatoria').custom( isDate ),
        check('end',  'Fecha de finalización  es obligatoria').custom( isDate ),
        validarCampos
    ], 
    crearEvento
)

//Actualizar evento
router.put('/:id',actualizarEvento)

//Actualizar evento
router.delete('/:id' ,eliminarEvento)

module.exports = router;

 