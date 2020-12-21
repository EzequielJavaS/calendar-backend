const express = require('express');
require('dotenv').config();
const {dbConection} = require('./database/config');
const cors = require('cors');

//Crear el servidor de express
const app = express();

//Conexión base de datos
dbConection();

//CORS
app.use(cors());


//Directorio público
app.use( express.static('public'));

//Lectura y parseo del body
//hay que pasar las peticiones por otro midlewere. Aquñi se procesaran las peticiones que lleguen tipo json.
app.use( express.json() );

//Rutas
//auth: crear, login, renovar token
app.use('/api/auth', require('./routes/auth')) //Ruta donde va a estar lo relacionado con la atenticación

// TODO CRUD: Eventos

//Escuchar peticiones .liten(puerto,)
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT}`);
})