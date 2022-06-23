const {io} = require('../index');

//Socket messaje 
io.on('connection',client =>{
    console.log('Cliente conectado');


    client.on('disconnect',()=>{
        console.log('Cliente conectado');
    })

    client.on('mensaje',(payload)=>{
        console.log('Mensaje',payload);
        io.emit('mensaje',{admin:'nuevo mensaje'})
    })

});




