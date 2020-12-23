//Para revisar que es una fecha válida. Puedo utilizar moment. Instalandolo primero: npm i moment
const moment = require('moment');

const isDate = ( value, { req, location, path } ) => { //{req,location,path} Aquí estamos desestructurando un elemento que se llama rest
    //value debe de tener el valor del campo que estamos validando.
    if ( !value ) {
        return false;
    }
    //Paso value a tipo Date
    const fecha = moment( value );
    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
}
module.exports = { isDate }