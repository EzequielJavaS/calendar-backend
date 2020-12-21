const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

//Para trabajar con usuarios, exportaremos este esquema
//El model se llamará usuario y usara el esquema UsuarioSchema
module.exports = model('Usuario', UsuarioSchema );