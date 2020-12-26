const {response} = require('express');
//Para grabar en la base de datos necesito poner la referencia al modelo
const Evento = require('../models/Evento')

const getEventos = async (req, res = response) => {

    //Devuelve los elementos de la colección Evento.
    //populate llama a documentos de otras colecciones relaccionadas
    const eventos = await Evento.find().populate('user', 'name __id');

    res.json({
        ok: true,
        eventos
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

const actualizarEvento = async (req, res = response) => {

    //Accedo al id del evento Este valor viene del valor que mando en la url
    const eventoId = req.params.id;
    const uid = req.uid;
  
    //Verificar si la id existe en la base de datos
    
    try {
        //Utilizamos el modelo de mongoose
        const evento = await Evento.findById( eventoId );
        console.log(evento.user.toString());
        console.log(uid);

        if ( !evento ){ //Si no existe el evento
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if (evento.user.toString() !== uid ){ //Si el usuario identificado no es el mismo que el que creó enevento
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de editar este evento'
            })
        }

        //El evento existe y el usuario es el correcto:
        const nuevoEvento = { //desestructuro lo que hay en la request.body, que es el evento modificado
            ...req.body,
            user: uid //Le añado la propiedad user dado que la request no la tiene y el modelo Evento lo requiere
        }

        //Si  no ponemos { new: true } devolverá e elemeto original. Esto nos devolverá el nuevo elemento
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true });

        res.json({
            ok:true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "hable con el administrador"
        });
    }
}

const eliminarEvento = async (req, res = response) => {

    //Accedo al id del evento Este valor viene del valor que mando en la url
    const eventoId = req.params.id;
    const uid = req.uid;
  
    //Verificar si la id existe en la base de datos
    
    try {
        //Utilizamos el modelo de mongoose
        const evento = await Evento.findById( eventoId );

        if ( !evento ){ //Si no existe el evento
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if (evento.user.toString() !== uid ){ //Si el usuario identificado no es el mismo que el que creó enevento
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de eliminar este evento'
            })
        }
        
        const eventoEliminado = await Evento.findByIdAndRemove ( eventoId );

        res.json({
            ok:true,
            evento: "eliminado"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "hable con el administrador"
        });
    }
}

    



module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}