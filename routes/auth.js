/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidaToken } = require('../controllers/auth');
const {validarCampos} = require('../middleware/validar-campos');
const {validarJWT} = require('../middleware/validar-jwt');//Hay que implementarlo en la ruta de validar token 
const router = Router();


router.post(
    '/new',
    [// middlewares. Hay que implementar el customMiddleware validar-campos en las rutas respectivas
        check('name',  'El nombre es obligatorio').not().isEmpty(),
        check('email',  'El email es obligatorio').isEmail(),
        check('password',  'Elpassword debe de tener 6 caraceres').isLength({ min: 6}),
        validarCampos
    ],
    crearUsuario
);

router.post('/',
    [// middlewares
    check('email',  'El email es obligatorio').isEmail(),
    check('password',  'Elpassword debe de tener 6 caraceres').isLength({ min: 6}),
    validarCampos
    ],
    loginUsuario
);

router.get('/renew', validarJWT, revalidaToken);

//Para habilitar que la ruta ya está configurada
module.exports = router;

