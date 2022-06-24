const express=require('express');
const path=require('path');
//db config 
const {dbConection}  =require('./database/config');
dbConection();

require('dotenv').config();

//app de express 
const app= express();

//Lectura y parseo del body
app.use(express.json());


//node server 
const server= require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')


//entrada publica -path
const publicPath = path.resolve(__dirname,'public')
app.use(express.static(publicPath))



//definicon de rutas
app.use('/api/login',require('./routes/auth'));
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/mensajes',require('./routes/mensajes'));



server.listen(process.env.PORT,(error)=>{
    if(error)throw new Error(error)
    console.log('Servidor corriedo en el puerto :',process.env.PORT);
});