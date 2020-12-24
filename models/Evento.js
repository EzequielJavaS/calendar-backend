const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title:{
        type: String,
        required: true
    },
    notes:{
        type: String,
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true

    }
});

//Para modificar la presentación de la serilización o la configuración de cómo se muestra la información
//Estos cambios son en el json a la hora de verlo. No modifica la base de datos
EventoSchema.method('toJSON', function() {
    const {__v, _id, ...object } =this.toObject(); //De este objeto estraigo el __v, _id y el resto de elementos destructurados
    object.id = _id;//remplazo el _id
    return object;
});




module.exports = model('Evento', EventoSchema );

//El use es el usuario que creo este registro. Hace referencia al esquema usuario