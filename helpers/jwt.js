const jwt = require('jsonwebtoken');//Importación de librería 

//GenerarJWT debe recibir lo que quiero poner como payload del token
const generarJWT = ( uid, name ) => {
    //Quiero retornar un apromesa de tal manera que pueda hacer el await y esperar que esto se genere.
    return new Promise( (resolve, reject) => {
        //Aquí se realizará el proceso de la generación de este JWT
        const payload = { uid, name };

        //Genero el token
        jwt.sign( payload,
            process.env.SECRET_JWT_SEED,
            {expiresIn: '2h'},
            (err, token)=>{
                if (err){
                    console.log(err);
                    reject('No se pudo generar el token');
                }
                resolve( token );
            }
        )
    })

}

module.exports = {generarJWT}