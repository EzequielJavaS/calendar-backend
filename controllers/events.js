const {response} = require('express');
//Para grabar en la base de datos necesito poner la referencia al modelo
const Evento = require('../models/Evento')

const getEventos = (req, res = response) => {
    res.json({
        ok: true,
        msg:'getEventos'
    })
}

const crearEvento =async (req, res = response) => {

    //Creamos una instancia del modelo
    const evento = new Evento( req.body );
   
    try {
        //Ponemos el id del usuario al evento ya que es necesario
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
        
    }
}

const actualizarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg:'actualizarEvento'
    })
}

 const eliminarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg:'eliminarEvento'
    })
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}