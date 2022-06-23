const jwt =require('jsonwebtoken');
require('dotenv').config();

const generarJWT=(uid)=>{

   return new Promise((resolve,reject)=>{

    const payload={
        uid
    }
    jwt.sign(payload,process.env.JWT_KEY,{
        expiresIn:'24h'

    },(err,token)=>{

        if(err){
            reject('No se pudo generar el JWT ');
        }else{
            resolve(token);
            //console.log(token);
        }


    })



   })

}

module.exports={
    generarJWT
}