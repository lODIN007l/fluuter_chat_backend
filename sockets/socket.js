const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');
const {usuarioConectado,usuarioDesonectado, grabarMensaje}= require('../controllers/socket')

//Socket messaje 
io.on('connection',client =>{
    console.log('Cliente conectado');

    //console.log(client.handshake.headers['x-token']);
    //CLIENTE CON jwt 
    //verificar toke del cliente 
    const [valido,uid] =comprobarJWT(client.handshake.headers['x-token']);
    //console.log(valido,uid);
    if(!valido){return client.disconnect();}
    //cliente conectado 
    console.log('cliente autentificado');
    //actualizar estado
    usuarioConectado(uid);

    //conectar al usuaruo a una sala 
    //sala global,client id por defecto una a esas dos 
    // si quiero mandar a otra persona : 
    client.join(uid);
    //client.to(uid).emit('')
    //escuchar el "mensaje-persona"
    client.on('mensaje-personal',async (payload)=>{
        //console.log(payload);
        await grabarMensaje(payload)


        io.to(payload.para).emit('mensaje-personal',payload);


    })



    client.on('disconnect',()=>{
        usuarioDesonectado(uid);
        console.log('Cliente desconectado');
    })

    client.on('mensaje',(payload)=>{
        console.log('Mensaje',payload);
        io.emit('mensaje',{admin:'nuevo mensaje'})
    })

});




