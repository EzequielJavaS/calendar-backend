const{ response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res=response, next )=> {
    //x-token headers
    const token = req.header('x-token');  //Función express para leer lo headers

    //Hay que validar el token
    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        //Ahora, en la request: req puedo incluir el uid y el name para poder trabajar con ellos en otros lugares.
        req.uid = payload.uid;
        req.name = payload.name;
       
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}