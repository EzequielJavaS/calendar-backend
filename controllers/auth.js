const {response} = require('express');
const Usuario = require('../models/Usuario') //Importo el modelo Usuario
const  bcrypt  = require ('bcryptjs'); //Encriptar conraseña
const  {generarJWT} = require('../helpers/jwt')//Generar Token

const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        //Revisamos si existe usuario con ese correo
        let usuario = await Usuario.findOne({email});
        
        if ( usuario ){ //Mensaje si SÍ existe el usuario
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }
        //Creo una instancia del Usuario que le mando la información que me envía el cliente
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(); //Genera una cadena aleatorio
        usuario.password = bcrypt.hashSync( password, salt ); //Se hashea (encripta) la contraseña

        //Esto es para guardarlo en la base de datos.
        await usuario.save();

        //Genero Token JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        }) 
    }  
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    //console.log(req.body);

    try {
        //Revisamos si existe usuario con ese correo
        let usuario = await Usuario.findOne({email});
    
        if ( !usuario ){ //Mensaje si NO existe el usuario
            return res.status(400).json({
                ok: false,
                msg: 'No existe usuario con ese email'
            })
        }

        //Confirmar los passwords
        //Compara el password introducido por el cliente (password) con el que hay en la base de datos (usuario.password)
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar nuestro JWT (Json Web Token)
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })  
    }
}

const revalidaToken = async (req, res = response) => {

    const {uid, name } = req;

    //Generar un nuevo JWT y retornarlo en esta petición
    const token = await generarJWT( uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidaToken
}